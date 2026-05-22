// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')


app.get('/', async function (request, response) {
  response.render('index.liquid')
})





const districts = ["oost", "nieuw-west", "zuidoost", "algemeen"];
app.use((req, res, next) => {
  res.locals.districts = districts;
  next();
})
app.get('/district/:district_name', async function (req, res) {
  const district = req.params.district_name
  const targetGroup = req.query.target_group || ''
  const sortOption = req.query.sort || ''


  const sortMap = {
    az: 'title',
    'nieuw-oud': '-date',
    'oud-nieuw': 'date'
  }

  const sortValue = sortMap[sortOption] || '-date,title'

  let url = `https://fdnd-agency.directus.app/items/buurtcampuskrant_stories/?filter[district][_eq]=${district}&fields=*,cover.id,cover.width,cover.height&sort=${sortValue}`

  if (targetGroup) {
    url += `&filter[target_group][_eq]=${targetGroup}`
  }

  const districtDetailResponse = await fetch(url)
  const districtDetailResponseJSON = await districtDetailResponse.json()

  const allResponse = await fetch(
    `https://fdnd-agency.directus.app/items/buurtcampuskrant_stories/?filter[district][_eq]=${district}&fields=target_group`
  )
  const allJSON = await allResponse.json()
  const targetGroups = [...new Set(allJSON.data.map(s => s.target_group).filter(Boolean))]

  const articles = {
    district: districtDetailResponseJSON.data,
    districtName: district,
    targetGroups,
    activeGroup: targetGroup,
    activeSort: sortOption
  }

  res.render('district.liquid', articles)
})





// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\nSucces deze sprint. En maak mooie dingen! 🙂`)
})