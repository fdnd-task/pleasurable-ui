// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from "express";

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import {Liquid} from "liquidjs";

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}));

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views");


app.get('/', async function (request, response) {
  response.render('index.liquid')
})

// this is to preview the news card the page will be updated in an other pull request 
app.get('/nieuws', async function name(request, response) {
  response.render('news.liquid')
})

// GET route voor de LAdO pagina
// Haalt alle LAdO data op uit Directus en stuurt deze door naar lado.liquid
app.get('/lado', async function (request, response) {

  // Fetch data uit de Directus API
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/adconnect_lados')

  // Zet de response om naar JSON
  const apiResponseJSON = await apiResponse.json()

  // Pak alleen de data array uit de response
  const lados = apiResponseJSON.data

  // Render de pagina en geef de lados data mee aan Liquid
  response.render('lado.liquid', {
    lados: lados
  })
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  console.log(
    `Project draait via http://localhost:${app.get("port")}/\n\nSucces deze sprint. En maak mooie dingen! 🙂`,
  );
});

const baseURL = "https://fdnd-agency.directus.app/items/adconnect_";

app.get("/", async function (request, response) {
  response.render("index.liquid");
});

app.get("/talent-awards", async function (request, response) {
  const awardsResponse = await fetch(baseURL + "nominations");
  const awardsResponseJSON = await awardsResponse.json();
  response.render("talent-awards.liquid", {
    nominations: awardsResponseJSON.data,
    path: request.path,
  });
});

app.get("/nieuws", async function name(request, response) {
  response.render("news.liquid");
});
