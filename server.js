// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

const agencies = await fetch("https://fdnd-agency.directus.app/items/dda_agencies");
const agenciesJSON = await agencies.json();

const publications = await fetch("https://fdnd-agency.directus.app/items/dda_publications")
const publicationsJSON = await publications.json();

const events = await fetch("https://fdnd-agency.directus.app/items/dda_events");
const eventsJSON = await events.json();


// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')


app.get('/', async function (request, response) {
  response.render('index.liquid')
})

app.get('/over-ons', async function (request, response) {
  response.render('over-ons.liquid')
})

// geen extra details paginas voor over-ons

app.get('/events', async function (request, response) {
  response.render('events.liquid', {
   voorbeeld: eventsJSON.data
  });
})

// extra detailpagina's voor evenementen (JSON file)
// zoek functie hier

app.get('/publicaties', async function (request, response) {
  response.render('publicaties.liquid'), {
    publication: publicationsJSON.data
  } 
})

// detailpaginas voor publicaties
// zoek functie hier

app.get('/leden', async function (request, response) {
  response.render('leden.liquid', {
    agency: agenciesJSON.data 
  }) 
})

// detailpagina
// zoek functie

app.get('/vacatures', async function (request, response) {
  response.render('vacatures.liquid', {
  })
})

// detailpagina
// zoek functie

app.get('/lid-worden', async function (request, response) {
  response.render('lid-worden.liquid')
})

// form element


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {

  console.log('Da only one website! 🔮')
})
