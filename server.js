console.log('SERVER UPDATED')
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

async function getStories() {
  const apiResponse = await fetch(
    'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories'
  )

  const apiResponseJSON = await apiResponse.json()

  return apiResponseJSON.data
}

app.get('/', async function (request, response) {
  const search = request.query.search

  let stories = await getStories()

  if (search) {
    stories = stories.filter(function (story) {
      return story.title
        .toLowerCase()
        .includes(search.toLowerCase())
    })
  }

  response.render('index.liquid', {
    stories: stories,
    search: search
  })
})

app.get('/algemeen', async function (request, response) {
  const search = request.query.search

  let stories = await getStories()

  stories = stories.filter(function (story) {
    return story.district === 'algemeen'
  })

  if (search) {
    stories = stories.filter(function (story) {
      return story.title
        .toLowerCase()
        .includes(search.toLowerCase())
    })
  }

  response.render('algemeen.liquid', {
    stories: stories,
    search: search
  })
})

app.get('/nieuw-west', async function (request, response) {
  const search = request.query.search

  let stories = await getStories()

  stories = stories.filter(function (story) {
    return story.district === 'nieuw-west'
  })

  if (search) {
    stories = stories.filter(function (story) {
      return story.title
        .toLowerCase()
        .includes(search.toLowerCase())
    })
  }

  response.render('nieuw-west.liquid', {
    stories: stories,
    search: search
  })
})

app.get('/zuidoost', async function (request, response) {
  const search = request.query.search

  let stories = await getStories()

  stories = stories.filter(function (story) {
    return story.district === 'zuidoost'
  })

  if (search) {
    stories = stories.filter(function (story) {
      return story.title
        .toLowerCase()
        .includes(search.toLowerCase())
    })
  }

  response.render('zuidoost.liquid', {
    stories: stories,
    search: search
  })
})

app.get('/oost', async function (request, response) {
  const search = request.query.search

  let stories = await getStories()

  stories = stories.filter(function (story) {
    return story.district === 'oost'
  })

  if (search) {
    stories = stories.filter(function (story) {
      return story.title
        .toLowerCase()
        .includes(search.toLowerCase())
    })
  }

  response.render('oost.liquid', {
    stories: stories,
    search: search
  })
})


app.get('/:district/:slug', async function (request, response) {
  const district = request.params.district
  const slug = request.params.slug

  const params = {
    'filter[slug][_eq]': slug,
    'fields':
      'title, body, target_group, id, slug, district, intro, date, cover.*, comments.*'
  }

  const apiURL =
    'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories?' +
    new URLSearchParams(params)

  const apiResponse = await fetch(apiURL)
  const apiResponseJSON = await apiResponse.json()
  const story = apiResponseJSON.data[0]

  if (!story) {
    return response.status(404).render('error.liquid')
  }

  response.render('article.liquid', {
    story,
    district: story.district || district
  })
})

/**
 * COMMENT POST – reactie plaatsen op artikel
 */
app.post('/:district/:slug/comment', async function (request, response) {
  const res = await fetch(
    'https://fdnd-agency.directus.app/items/buurtcampuskrant_stories_comments',
    {
      method: 'POST',
      body: JSON.stringify({
        name: request.body.name,
        comment: request.body.comment,
        story: Number(request.body.story)
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  )
  // const data = await res.json()
  // console.log(data)

  response.redirect(303, `/${request.params.district}/${request.params.slug}/`)
})

// Comment delete
app.post('/:district/:slug/comment/:id/delete', async function (request, response) {
  const commentId = request.params.id

  await fetch(
    `https://fdnd-agency.directus.app/items/buurtcampuskrant_stories_comments/${commentId}`,
    {
      method: 'DELETE'
    }
  )

  response.redirect(303, `/${request.params.district}/${request.params.slug}/`)
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\nSucces deze sprint. En maak mooie dingen! 🙂`)
})  