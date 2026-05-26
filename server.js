// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from "express";

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import {Liquid} from "liquidjs";

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }))

// Gebruik de map 'public' voor statische bestanden
app.use(express.static("public"));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());

// Stel de map met Liquid templates in
app.set("views", "./views");

// Stel het poortnummer in waar Express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\nSucces deze sprint. En maak mooie dingen! 🙂`)
})

const baseURL = 'https://fdnd-agency.directus.app/items/adconnect_'

app.get('/', async function (request, response) {
  const params = {
    fields: "title,description,date",
    sort: "-date_created",
  };

  const newsResponse = await fetch(
    baseURL + "news/?" + new URLSearchParams(params),
  );

  const newsResponseJson = await newsResponse.json();

  response.render('index.liquid', {
    news: newsResponseJson.data
  })
})

app.get('/talent-awards', async function (request, response) {
  const awardsResponse = await fetch(baseURL + 'nominations')
  const awardsResponseJSON = await awardsResponse.json()

  response.render('talent-awards.liquid', {
    nominations: awardsResponseJSON.data,
    path: request.path
  })
})

app.get('/lado', async function (request, response) {
  const apiResponse = await fetch(baseURL + 'lados')
  const apiResponseJSON = await apiResponse.json()

  response.render('lado.liquid', {
    lados: apiResponseJSON.data
  })
})

app.get("/nieuws", async function name(request, response) {
  const params = {
    fields: "title,description,date",
    sort: "-date_created",
  };

app.get('/contact', async function (request, response) {
  response.render('contact.liquid')
})

app.get('/contact', async function (request, response) {
  response.render('contact.liquid')
})

  const newsResponse = await fetch(
    baseURL + "news/?" + new URLSearchParams(params),
  );

  const newsResponseJson = await newsResponse.json();

  response.render("news.liquid", {
    path: request.path,
    news: newsResponseJson.data,
  });
});
app.post('/contact', async function (request, response) {

  await fetch('https://fdnd-agency.directus.app/items/adconnect_contact', {
    method: 'POST',
    body: JSON.stringify({
      name: request.body.name,
      email: request.body.email,
      message: request.body.message,
    }),

    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })

  response.redirect(303, '/contact')
})

// 404 page this must always be at the bottom of the document
app.use((request, response, next) => {
  response.render('404.liquid')
})