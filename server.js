// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// ALLES HIERBOVEN NIET AANKOMEN SVP

const apiTasks = "https://fdnd-agency.directus.app/items/dropandheal_task";
const tasksResponse = await fetch(apiTasks);
const tasksData = await tasksResponse.json();


app.get('/', async function (request, response) {
  const taskResponse = await fetch('https://fdnd-agency.directus.app/items/dropandheal_task')
  const taskResponseJSON = await taskResponse.json()

  response.render('index.liquid', {
    task: taskResponseJSON.data
  })
})

// This is the rouwtaakpage page route where you can responsively switch Rouwtaak from the header
app.get('rouwtaak/:id', async function (request, response) {
  try {
    const taskId = request.params.id;
    const specificTaskResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_task/?filter={"id":${taskId}}`);
    
    const specificTaskData = await specificTaskResponse.json();
    const taskObject = Array.isArray(specificTaskData.data) ? specificTaskData.data[0] : specificTaskData.data;

    response.render('rouwtaak.liquid', {
      title: 'rouwtaak',
      tasks: tasksData.data,
      taskObject
    });
  } catch (error) {
    console.error("Something Wrong in the index page check this",error);
    response.status(500).render("error.liquid");
  }
});


//exercise page router  also count the messages here
app.get('/exercise/:id', async function (request, response) {
  try {
    const exerciseId = request.params.id;

    const exerciseResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise/?fields=*.*&filter={"id":"${exerciseId}"}&limit=1`);
    const exerciseResponseJSON = await exerciseResponse.json();

    const countResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages?aggregate[count]=*&filter={"exercise":{"_eq":${exerciseId}}}`);
    const countResponseJSON = await countResponse.json();
    const messageCount = countResponseJSON.data[0].count;

    response.render('exercise.liquid', {
      title: "exercise",
      countMessages: messageCount,
      specificExercise: exerciseResponseJSON.data
    });
  } catch (error) {s
    console.error("Something Wrong in the exercise page, check this:",error);
    response.status(500).render("error.liquid");
  }
});
// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/`)
})
