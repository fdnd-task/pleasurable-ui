let socket = io()
let messages = document.querySelector('#message-container')
let messageInput = document.querySelector('#message-input')

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
    socket.emit('chat', {
      input: messageInput.value,
      time: new Date().toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric'})
  })
  messageInput.value = ''
})

socket.on('chat', data => {
  messages.innerHTML += `
    <h2>Name <span class="time">${data.time}</span></h2>
    <p>${data.input}</p>
  `
  messages.scrollTop = messages.scrollHeight
})