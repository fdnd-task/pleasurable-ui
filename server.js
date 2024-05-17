// Importeer het npm pakket express uit de node_modules map
import express from "express";

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// ---- GET Routes ----

// Maak een GET route voor de favorieten pagina
app.get("/", function (request, response) {
  // Neem alle huizen in mijn lijst uit de API
  fetchJson(
    "https://fdnd-agency.directus.app/items/f_list/6?fields=id,title,description,users.id,users.f_users_id.name,users.f_users_id.email,users.f_users_id.avatar,houses.id,houses.f_houses_id.id,houses.f_houses_id.street,houses.f_houses_id.house_nr,houses.f_houses_id.city,houses.f_houses_id.postal_code,houses.f_houses_id.price,houses.f_houses_id.poster_image.id,houses.f_houses_id.poster_image.width,houses.f_houses_id.poster_image.height"
  ).then((apiData) => {
    // Render favorieten.ejs uit de views map en geef de opgehaalde data mee
    response.render("favorieten", apiData);
  });
});

// Get route voor een detailpagina met een request parameter id
app.get("/huis/:id/", function (request, response) {
  // Gebruik de request parameter id en haal het juiste huis uit de houses lijst
  fetchJson(
    "https://fdnd-agency.directus.app/items/f_houses/" + request.params.id
  ).then((apiData) => {
    // Render huis.ejs uit de views map en geef de opgehaalde data mee
    response.render("huis", apiData);
  });
});

// ---- POST Routes ----

app.post("/rate/:id/:rating", function (request, response) {
  const id = request.params.id;
  const rating = request.params.rating;

  fetch("https://fdnd-agency.directus.app/items/f_feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "house": id,
      "list": 6,
      "user": 6,
      "rating": { general: rating },
    }),
  }).then((data) => {
    response.json(data);
  });
});

// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});