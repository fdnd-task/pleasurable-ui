// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

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

//base url om code wat simpeler te maken, moet wel met ` gebruiken.
const baseUrl = 'https://fdnd-agency.directus.app/items/preludefonds_instruments/'
const logUrl = 'https://fdnd-agency.directus.app/items/preludefonds_log'

app.get('/', async function (request, response) {
  response.render('home.liquid')
})
  
app.get('/instrumenten', async function (request, response) {
  const params = new URLSearchParams()
  const instrumentResponse = await fetch(`${baseUrl}?${params.toString()}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('overzicht.liquid', { instrumenten: instrumentResponseJSON.data })
})

app.get('/instrumenten/nieuw', async function (request, response) {
  response.render('nieuw.liquid')
})

app.post('/instrumenten/nieuw', async function (request, response){
  response.redirect(303, `/instrumenten/`)
})

app.get('/actielog', async function (request, response) {
  const params = new URLSearchParams()
  params.append('fields', '*,instrument.name,instrument.serial_number,instrument.key')
  params.append('sort', '-date_created')
  const logResponse = await fetch(`${logUrl}?${params.toString()}`)
  const logResponseJSON = await logResponse.json()

  response.render('actielog.liquid', { logs: logResponseJSON.data })
})

app.get('/instrumenten/:key', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('detail.liquid', { instrument: instrumentResponseJSON.data[0] })
})

app.get('/instrumenten/:key/uitlenen', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('uitlenen.liquid', { instrument: instrumentResponseJSON.data[0] })
})

app.post('/instrumenten/:key/uitlenen', async function (request, response) {
  response.redirect(303, `/instrumenten/${request.params.key}`)
})

app.get('/instrumenten/:key/innemen', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('innemen.liquid', { instrument: instrumentResponseJSON.data[0] })
})

app.post('/instrumenten/:key/innemen', async function (request, response) {
  response.redirect(303, `/instrumenten/${request.params.key}`)
})

app.get('/instrumenten/:key/aanpassen', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('aanpassen.liquid', { instrument: instrumentResponseJSON.data[0] })
})

app.post('/instrumenten/:key/aanpassen', async function (request, response) {
  response.redirect(303, `/instrumenten/${request.params.key}`)
})

app.get('/instrumenten/:key/schade', async function (request, response) {
  const instrumentResponse = await fetch(`${baseUrl}?filter[key]=${request.params.key}`)
  const instrumentResponseJSON = await instrumentResponse.json()

  response.render('schade.liquid', { instrument: instrumentResponseJSON.data[0] })
})

app.post('/instrumenten/:key/schade', async function (request, response) {
  response.redirect(303, `/instrumenten/${request.params.key}`)
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\nSucces deze sprint. En maak mooie dingen! 🙂`)
})