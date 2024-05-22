console.log('Hier komt jullie server')

// Dit houdt in dat je de express module importeert en deze vervolgens gebruikt om een nieuwe express applicatie te maken. Deze applicatie wordt opgeslagen in de variabele app.
// Daarnaast wordt de poort waarop de server moet luisteren opgeslagen in de variabele port.
import express from 'express'
const app = express()
const port = 3000
console.log('server opent op poort 3000')

// Dit houdt in dat je de fetchJson functie importeert vanuit het bestand fetch-json.js en deze vervolgens gebruikt om data op te halen van de server.
import fetchJson from './helpers/fetch-json.js'
console.log(fetchJson)

// Hiermee definieer je de url van de API die je wilt benaderen. In dit geval is dat de API van de directus app die we gebruiken voor Funda.
const apiUrl = `https://fdnd-agency.directus.app/items/f_list/${9}?fields=*.*.*`;
console.log(apiUrl)


// ...
// Dit zorgt ervoor dat de fetchJson functie wordt aangeroepen met de apiUrl als parameter. Een parameter is een waarde die je meegeeft aan een functie.
// Dit houdt in dat de apiUrl wordt gebruikt om data op te halen van de server.
fetchJson(apiUrl).then((apiData) => {
    console.log(apiData);

    // Hiermee zet je de view engine van de express applicatie op ejs en zorg je ervoor dat de views in de map views worden opgeslagen.
    // Daarnaast maak je de public map statisch zodat de bestanden in deze map kunnen worden opgehaald.
    // Ook gebruik je de express.urlencoded middleware om het werken met request data makkelijker te maken.
    app.set('view engine', 'ejs');
    app.set('views', 'views');
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));

    // Dit zorgt ervoor dat de server de index.ejs file rendert wanneer er een get request wordt gedaan op de root van de server.
    // Vervolgens wordt de data van de API meegegeven aan de view zodat deze kan worden gebruikt in de ejs file.
    // houses: apiData.data.houses is de data die wordt meegegeven aan de view. Deze data is afkomstig van de API.
    app.get('/', async (req, res) => {
        res.render('index', { houses: apiData.data.houses });
    });

    // Dit zorgt ervoor dat de server start op poort 3000 en dat er een bericht wordt gelogd in de console wanneer de server is gestart.
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), function () {
        console.log(`Application started on http://localhost:${app.get('port')}`);
    });
});

// ...