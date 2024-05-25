import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 8009)

app.listen(app.get('port'), function () {
 console.log(`Application started on http://localhost:${app.get('port')}`)
})

const apiUrl = 'https://fdnd-agency.directus.app/items',
    sdgData = await fetchJson(apiUrl + '/hf_sdgs'), 
    stakeholdersData = await fetchJson(apiUrl + '/hf_stakeholders'),
    scoresData = await fetchJson(apiUrl + '/hf_scores'),
    companiesData = await fetchJson(apiUrl + '/hf_companies')

console.log(companiesData.data.name)

// ROUTES -----------------------------------------------------------
app.get('/', function (request, response) {
    response.render('index', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

app.get('/dashboard/:company_id', function (request, response) { 
    var companyId = request.params.company_id
    response.render('dashboard', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

// VRAGENLIJST -----------------------------------------------------
app.get('/gegevens-form/:stakeholder_type', function (request, response) {
    var stakeholderType = request.params.stakeholder_type 
    response.render('gegevens-form', {
        stakeholder: stakeholdersData.data,
        company: companiesData.data,
    })
})

app.get('/sdg-form', function (request, response) { 
    response.render('sdg-form', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

app.get('/score-form/:sdg_id', function (request, response) {
    var sdgId = request.params.sdg_id
    response.render('score-form', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

app.get('/done', function (request, response) {
    response.render('done-form', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

