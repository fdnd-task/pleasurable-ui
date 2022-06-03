// Variables

let socket = io()
let userButton = document.getElementById('user-button')
let overlay = document.querySelector('.overlay')
let messages = document.querySelector('#message-container')
let messageInput = document.querySelector('#message-input')
let messageForm = document.querySelector('form')
let submitButton = document.querySelector('.submit-button')
let name = localStorage.getItem('name') || prompt('What is your name?')
let date = new Date().toLocaleDateString([], { year: 'numeric', month: 'numeric', day: 'numeric' })

// Eventlisteners and Function Decleration

userButton.addEventListener('click', () => {
  overlay.classList.add('open-menu')
  userButton.classList.add('change-color')
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let message = messageInput.value
  if (messageInput.value === '') return
  messages.insertAdjacentHTML(
    'beforeend',
    `
		<li>
      <span class="circle">${name.charAt(0)}</span>
      <div class="message">
        <h2>${name} ${date}</h2>
        <p>${message}</p>
      </div>
		</li>
	`
  )
  socket.emit('send-chat-message', message)
  messageInput.value = ''
  messages.scrollTo(0, messages.scrollHeight)
})

localStorage.setItem('name', name)

renderWelcomeMessage()

// Socket.io Functions

socket.emit('new-user', name)

socket.on('user-connected', (name) => {
  messages.insertAdjacentHTML(
    `beforeend`,
    `<li>${name} has joined the chat!</li>`
  )
  messages.scrollTo(0, messages.scrollHeight)
})

socket.on('chat-message', (data) => {
  messages.insertAdjacentHTML(
    'beforeend',
    `
		<li>
      <span class="circle circle-received">${data.name.charAt(0)}</span>
      <div class="message">
        <h2>${data.name} ${date}</h2>
        <p>${data.message}</p>
      </div>
		</li>
	`
  )
  messages.scrollTo(0, messages.scrollHeight)
})

socket.on('user-disconnected', (data) => {
  messages.insertAdjacentHTML(
    `beforeend`,
    `<li>${name} has left the chat!</li>`
  )
  messages.scrollTo(0, messages.scrollHeight)
})

// Functions

function renderWelcomeMessage() {
  messages.insertAdjacentHTML(
    `beforeend`,
    `<li class="welcome-message">Welcome ${name}, have a great time talking to everybody!</li>`
  )
}