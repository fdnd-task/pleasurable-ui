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






// Maak een GET route voor de index
app.get('/', function (request, response) {
    fetchJson(sdgList).then((sdgDataUitDeAPI) => {
        fetchJson(companies).then((companiesUitDeAPI) => {
            response.render("index", {sdgs: sdgDataUitDeAPI.data, companies: companiesUitDeAPI.data});
        });  
    });
});
