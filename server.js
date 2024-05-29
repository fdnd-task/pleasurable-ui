import express from 'express';
import fetchJson from './helpers/fetch-json.js';


  // Haal alle data op van de API
  const apiData = await fetchJson('https://fdnd-agency.directus.app/items/dh_services');

  // Maak een nieuwe express app aan
  const app = express();

  // Dit zorgt ervoor dat je JSON kunt ontvangen in POST requests
  app.use(express.json());

  // Stel ejs in als template engine
  app.set('view engine', 'ejs');

  // Stel de map met ejs templates in
  app.set('views', './views');

  // Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
  app.use(express.static('public'));

  // Middleware om url-encoded bodies te parsen
  app.use(express.urlencoded({ extended: true }));

  // post request

app.post('/bedankt', async function (request, response) {
 
  // krijg de form data binnen
  const formData = request.body;

  // Log in de console data die binnenkomt
  console.log('Form data:', formData);

  // Render the success page and pass the form data to it
  response.render('bedankt', { formData: formData });
}
);

  app.get('/', async function (request, response) {
    // Haal de data op van de API
    const apiData = await fetchJson('https://fdnd-agency.directus.app/items/dh_services');
    console.log('API Data:', apiData);
    // Render de index pagina en geef de data mee
    response.render('index', { services: apiData.data });
  });

// footer pagina
app.get('/footer', function (request, response) {
  response.render('footer');
});

// overzin pagina
app.get('/overzicht', async function (request, response) {
  // Haal de data op van de API
  const apiData = await fetchJson('https://fdnd-agency.directus.app/items/dh_services');
  console.log('API Data:', apiData);
  // Render de index pagina en geef de data mee
  response.render('overzicht', { services: apiData.data });
});

app.get('/service/:id', async function (request, response) {
  // Haal de data op van de API
  const apiData = await fetchJson('https://fdnd-agency.directus.app/items/dh_services');
  console.log('API Data:', apiData);
  // Vind de service met het opgegeven id
  const service = apiData.data.find(service => service.id == request.params.id);
  // Render de service pagina en geef de data mee
  response.render('service', { service: service });
});


  

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000);

// Start express op en luister naar het ingestelde poortnummer
app.listen(app.get('port'), function () {
  // Toon een bericht in de console met het gebruikte poortnummer
  console.log(`Application started on http://localhost:${app.get('port')}`);
});
