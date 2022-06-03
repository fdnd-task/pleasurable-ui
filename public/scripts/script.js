// Variables

let socket = io()
let messages = document.querySelector('#message-container')
let messageInput = document.querySelector('#message-input')
let messageForm = document.querySelector('form')
let name = localStorage.getItem('name') || prompt('What is your name?')
let date = new Date().toLocaleDateString([], { year: 'numeric', month: 'numeric', day: 'numeric' })

// Eventlisteners and Function Decleration

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let message = messageInput.value
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
})

socket.on('user-disconnected', (data) => {
  messages.insertAdjacentHTML(
    `beforeend`,
    `<li>${name} has left the chat!</li>`
  )
})

// Functions

function renderWelcomeMessage() {
  messages.insertAdjacentHTML(
    `beforeend`,
    `<li class="welcome-message">Welcome ${name}, have a great time talking to everybody!</li>`
  )
}