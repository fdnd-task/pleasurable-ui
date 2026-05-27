// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from "express";

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from "liquidjs";

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }));

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views");

app.get("/", async function (request, response) {
  response.render("index.liquid");
});

app.get("/cadeau-overzicht", async function (request, response) {
  response.render("cadeau.liquid");
});

app.get("/wishlist", async function (request, response) {

  const params = {
    fields:
      "liked_products.milledoni_products_id.id," +
      "liked_products.milledoni_products_id.name," +
      "liked_products.milledoni_products_id.image," +
      "liked_products.milledoni_products_id.amount"
  };

  // fetch gebruiker 63 inclusief opgeslagen producten
  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/milledoni_users/63/?" +
    new URLSearchParams(params)
  );

  // zet response om naar JSON
  const productResponseJSON = await productResponse.json();

  // pak alleen de product data uit de koppeling
  const likedProducts = productResponseJSON.data.liked_products
    .filter(item => item.milledoni_products_id !== null)
    .map(item => item.milledoni_products_id);

  // stuur producten door naar de liquid pagina
  response.render("wishlist.liquid", {
    likedProducts: likedProducts,
  });

});

app.post("/verwijder", async function (request, response) {
  const productId = request.body.id;

  console.log("PRODUCT ID:", productId)

  if (!productId) {
    console.log("Geen product id ontvangen")
    return response.redirect(303, "/wishlist");
  }

  const relationResponse = await fetch(
    `https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1?filter[milledoni_users_id][_eq]=63&filter[milledoni_products_id][_eq]=${productId}&fields=id&limit=1`
  );

  const relationJSON = await relationResponse.json();

  console.log("RELATION RESPONSE:", relationJSON)

  if (!relationJSON.data?.length) {
    console.log("Geen koppeling gevonden")
    return response.redirect(303, "/wishlist");
  }

  const relationId = relationJSON.data[0].id;

  console.log("RELATION ID:", relationId)

  const deleteResponse = await fetch(
    `https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1/${relationId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );

  console.log("DELETE STATUS:", deleteResponse.status)

  response.redirect(303, "/wishlist");
});

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  console.log(
    `http://localhost:${app.get("port")}`,
  );
});

