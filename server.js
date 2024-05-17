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

// Dit zet de view engine van de express applicatie op ejs en zorgt ervoor dat de views in de map views worden opgeslagen.
// Daarnaast wordt de public map statisch gemaakt zodat de bestanden in deze map kunnen worden opgehaald.
// Ook wordt de express.urlencoded middleware gebruikt om het werken met request data makkelijker te maken.
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('public'))

// dit zorgt ervoor dat het werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// Dit zorgt ervoor dat de server de index.ejs file rendert wanneer er een get request wordt gedaan op de root van de server.
app.get('/', async (req, res) => {
    res.render('index')
});

//Dit houdt in dat de server start op poort 3000 en dat er een bericht wordt gelogd in de console wanneer de server is gestart.
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)   
    })