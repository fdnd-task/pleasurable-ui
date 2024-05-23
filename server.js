import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express(),
apiUrl = 'https://fdnd-agency.directus.app/items/',
scores = 'https://fdnd-agency.directus.app/items/hf_scores/?filter[stakeholder_id]=6',
sdgData = await fetchJson(apiUrl + '/hf_sdgs'),
stakeholders = apiUrl + "hf_stakeholders",
companies = apiUrl + "hf_companies";

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
// console.log(sdgData.data)

// Hier de get route van login
app.get('/', function(request, response) {
  fetchJson(companies).then((companiesUitDeAPI) => {
    response.render("index", {
      companies: companiesUitDeAPI.data
    });
  });
});


// get sdg
app.get('/sdg', (request, response) =>  {
  fetchJson(apiUrl + '/hf_sdgs').then((sdgData) =>{
	  response.render('sdg', {
    sdgs: sdgData.data
    })
  })
})

app.get('/score', (request, response) => {
  fetchJson(scores).then((scoreData) =>{
    response.render('score', {
      scores: scoreData.data
    })
  })
})

// post functie van index
app.post('/', function (request, response) {
  const bedrijfsID = request.body.companies;

  console.log(bedrijfsID);
  response.redirect("/dashboard/" + bedrijfsID);
});

app.post('/score', (request, response) =>{
  console.log(request.body)
  if (!Array.isArray(request.body.sdg_id)) {
    request.body.sdg_id = [request.body.sdg_id]
  }
  let result;
  
  // Voor elke sdg_id in de request.body, loop door deze fetch
  request.body.sdg_id.forEach(async function(sdg_id) {
    let body = JSON.stringify({
      sdg_id: Number(sdg_id),
      stakeholder_id: Number(request.body.stakeholder_id),
      score: 1
    })
    result = await fetch(scores, {
      method:'POST',
      body: body,
      headers: {'Content-Type': 'application/json'}
    })
  })
  response.redirect('/score')
})


// Stel het poortnummer in waar express naar moet gaan luisteren
app.set('port', process.env.PORT || 8001)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
