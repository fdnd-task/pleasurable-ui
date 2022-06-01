const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const compression = require('compression')
const PORT = process.env.PORT || 3000

// Routes
app.get('/', (req, res) => {
  res.render('index')
})

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat', (data) => {
    io.emit('chat', data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// Cache Headers
app.use((req, res, next) => {
  res.set('Cache-control', 'public, max-age=300')
  next()
})

// Compress all response
app.use(compression())

// Listen to port
http.listen(PORT, () => console.log(`Listening on http://[::]:${PORT}`))
