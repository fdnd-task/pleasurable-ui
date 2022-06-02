// Variables
let socket = io()
let messages = document.querySelector('#message-container')
let messageInput = document.querySelector('#message-input')
let messageForm = document.querySelector('form')
let name = prompt('What is your name?')
let time = new Date().toLocaleDateString([], {year: 'numeric', month: 'numeric', day: 'numeric'})

// Eventlisteners and Function Decleration

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let message = messageInput.value
  appendMessage(`You ${time}: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

appendMessage('You Joined')

// SOCKET.IO Functions

socket.emit('new-user', name)

socket.on('chat-message', (data) => {
  receivedMessage(`${data.name} ${data.time} : ${data.message}`)
})

socket.on('user-connected', (name) => {
  appendMessage(`${name} has connected`)
})

socket.on('user-disconnected', (data) => {
  appendMessage(`${name} has disconnected`)
})

// Functions

function appendMessage(message) {
  let messageEl = document.createElement('li')
  messageEl.innerText = message
  messages.append(messageEl)
}

function receivedMessage(message) {
  let receivedMessageEl = document.createElement('li')
  receivedMessageEl.classList.add('received')
  receivedMessageEl.innerText = message
  messages.append(receivedMessageEl)
}