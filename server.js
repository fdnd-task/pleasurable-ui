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
    app.use(bodyParser.json());

    // Dit zijn arrays die worden gebruikt om de beoordelingen van de gebruiker op te slaan.
    // arrays zijn een soort lijsten waarin je meerdere waarden kunt opslaan. In dit geval worden de beoordelingen van de gebruiker opgeslagen in de arrays.
    const algemeen = [];
    const locatie = [];
    const prijs= [];
    const oppervlakte = [];
    const ligging = [];
    const kamers = [];

    // Dit zorgt ervoor dat de server de index.ejs file rendert wanneer er een get request wordt gedaan op de root van de server.
    // Vervolgens wordt de data van de API meegegeven aan de view zodat deze kan worden gebruikt in de ejs file.
    // houses: apiData.data.houses is de data die wordt meegegeven aan de view. Deze data is afkomstig van de API.
    // algemeen, locatie, prijs, oppervlakte, ligging en kamers zijn de arrays die worden meegegeven aan de index.ejs file.
    // Deze arrays bevatten de beoordelingen van de gebruiker. Die worden met de get request opgehaald en vervolgens meegegeven aan de index.ejs file.
    app.get('/', async (req, res) => {
        res.render('index', 
        { houses: apiData.data.houses,
          algemeen: algemeen,
          locatie: locatie,
          prijs: prijs,
          oppervlakte: oppervlakte,
          ligging: ligging,
          kamers: kamers});
    });

    // Dit zorgt ervoor dat de server de submit-rating route afhandelt wanneer er een post request wordt gedaan op de /submit-rating route.
    // De push methode wordt gebruikt om een nieuwe waarde toe te voegen aan een array. 
    // Tot slot wordt er een redirect gedaan naar de homepagina.

    app.post('/submit-rating', (req, res) => {
        const ratings = req.body;
       
        console.log(ratings);
    
        // Dit voegt de gegevens toe aan de juiste arrays, dus de beoordelingen van de gebruiker worden hier opgeslagen in de arrays.
        algemeen.push(ratings.algemeneBeoordeling);
        locatie.push(ratings.locatie);
        prijs.push(ratings.prijs);
        oppervlakte.push(ratings.oppervlakte);
        ligging.push(ratings.ligging);
        kamers.push(ratings.kamers);
    
        // Stuur een response terug naar de client
        res.redirect('/');
    });
    

    // Dit zorgt ervoor dat de server start op poort 3000 en dat er een bericht wordt gelogd in de console wanneer de server is gestart.
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), function () {
        console.log(`Application started on http://localhost:${app.get('port')}`);
    });
});
