// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

//Hier komen de routes voor onze website. MARK: API
const api = "https://fdnd-agency.directus.app/items/tm_"
const api_users = "users"
const api_profile = "profile"
const api_buddy = "buddy"
const api_lang = "language"
const api_audio = "audio"
const api_playlist = "playlist"
const api_story = "story"
const api_animal = "animal"

//Hier komen de fetches naar de API. MARK: Fetch API
const usersResponse = await fetch(`${api}${api_users}`)
const profileResponse = await fetch(`${api}${api_profile}`)
const buddyResponse = await fetch(`${api}${api_buddy}`)
const languageResponse = await fetch(`${api}${api_lang}`)
const audioResponse = await fetch(`${api}${api_audio}`)
const playlistResponse = await fetch(`${api}${api_playlist}`)
const storyResponse = await fetch(`${api}${api_story}`)
const animalReponse = await fetch(`${api}${api_animal}`)

//Hier wordt de data opgehaald en vertaald in JSON. MARK: JSON DATA
const usersResponseJSON = await usersResponse.json()
const profileResponseJSON = await profileResponse.json()
const buddyResponseJSON = await buddyResponse.json()
const languageResponseJSON = await languageResponse.json()
const audioResponseJSON = await audioResponse.json()
const playlistResponseJSON = await playlistResponse.json()
const storyResponseJSON = await storyResponse.json()
const animalReponseJSON = await animalReponse.json()

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

// MARK: Homepage
app.get('/', async function (request, response) {
  response.render('index.liquid')
})

// MARK: Lessons
app.get('/lessons', async function (request, response) {
  response.render('lessons.liquid')
})

//MARK: Profilepage
app.get('/profile', async function (request, response) {
  response.render('profilepagina.liquid')
})

// MARK: Statistics
app.get('/statistics', async function (request, response) {
  response.render('statistics.liquid', { animal: animalJSON.data })
})

// MARK: Story settings
app.get('/story-settings', async function (request, response) {
  response.render('storysettings.liquid')
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`http://localhost:${app.get('port')}`)
})