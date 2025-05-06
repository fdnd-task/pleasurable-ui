import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express(),
apiUrl = 'https://fdnd-agency.directus.app/items/',
scores = 'https://fdnd-agency.directus.app/items/hf_scores/?filter[stakeholder_id]=6',
sdgData = await fetchJson(apiUrl + '/hf_sdgs'),
stakeholders = apiUrl + "hf_stakeholders?fields=*.*.*.*`",
companyList = apiUrl + "hf_companies";

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
// console.log(sdgData.data)

// Hier de get route van login
app.get('/', function(request, response) {
  fetchJson(companyList).then((companiesUitDeAPI) => {
    response.render("index", {
      companies: companiesUitDeAPI.data
    });
  });
});

// GET && POST voor Dashboard
app.get("/dashboard/:id", function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson(companyList + "/" + request.params.id).then((companyData) => {
    fetchJson(stakeholders + "/" + request.params.id).then(
      (stakeholderData) => {
        response.render("dashboard", {
          company: companyData.data,
          stakers: stakeholderData.data,
        })
      }
    );
  });
});
app.get("/stakeholder/:id", function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson(companyList + "/" + request.params.id).then((companyData) => {
    fetchJson(stakeholders + "/" + request.params.id).then(
      (stakeholderData) => {
        response.render("stakeholder", {
          company: companyData.data,
          stakers: stakeholderData.data,
        });
      }
    );
  });
});

app.post("/stakeholder/:id", function (request, response) {
  const bedrijfId = request.params.id,
  medewerkers = request.body.medewerkers,
  financiers = request.body.financiers,
  leveranciers = request.body.leveranciers,
  klanten = request.body.klanten,
  omgeving = request.body.omgeving,
  name = request.body.message,
  stakeholder = [];
  let aangevinkteRadiobox;
  if (medewerkers) {
    aangevinkteRadiobox = "medewerkers";
  } else if (financiers) {
    aangevinkteRadiobox = "financiers";
  } else if (leveranciers) {
    aangevinkteRadiobox = "leveranciers";
  } else if (klanten) {
    aangevinkteRadiobox = "klanten";
  } else if (omgeving) {
    aangevinkteRadiobox = "omgeving";
  }

  fetch("https://fdnd-agency.directus.app/items/hf_stakeholders", {
    method: "POST",
    body: JSON.stringify({
      company_id: bedrijfId,
      type: aangevinkteRadiobox,
      name: name,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((postReponse) => {

  });
  console.log(stakeholder);
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
app.post("/", function (request, response) {
  const bedrijfId = request.body.companies;
 
  console.log(bedrijfId);
  response.redirect("/dashboard/" + bedrijfId);
});

app.post("/dashboard/:id", function (request, response) {
  console.log(bedrijfId);
  response.redirect("/dashboard/" + bedrijfId);
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
