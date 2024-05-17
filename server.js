console.log('Hier komt jullie server')
import express from 'express'
import fetchJson from './helpers/fetch-json.js'
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items';
const stakeholders = apiUrl + "hf_stakeholders";
const companies = apiUrl + "hf_companies";
// Hier moeten de variabelen komen voor bedrijven kiezen


// Hier de get en post routes van login
app.get('/', function(request, response) {
  response.render('index')
});

app.post('/dashboard', function(request, response) {
  response.render('dashboard')
});



// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});