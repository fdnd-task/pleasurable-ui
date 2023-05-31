
// TEST 1 HOW MANY ACTIVE PLAYERS
const socket = io();

socket.emit('activePlayersCount')

socket.on('activePlayersCountClient', (totalCount) => {
    const countElement = document.getElementById('activePlayersCount');
    countElement.textContent = totalCount;
});


// WELCOME PAGE TIME COUNTDOWN
// Set the countdown time in seconds
var countdownTime = 5;
// Get the countdown element
var countdownElement = document.getElementById('countdown');
// Update the countdown every second
var countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    // Display the countdown
    countdownElement.innerHTML = countdownTime + 's';

    // Decrease the countdown time
    countdownTime--;

    // Stop the countdown when it reaches 0
    if (countdownTime < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = 'Lets go';

        // Navigate to the trivia page
        window.location.href = '/trivia';
    }
}


// TIMEOUT IFRAME

// Set the timeout duration in milliseconds (e.g., 5 seconds)
const timeoutDuration = 8000;

// Get the iframe element
const iframe = document.getElementById('myIframe');

// Set the timeout
setTimeout(() => {
    // Iframe timeout reached
    console.log('Iframe timeout reached.');

    // Hide or remove the iframe or perform any other desired action
    iframe.style.display = 'none';
}, timeoutDuration);


//  LIVE CHATROOM---------------------------------------------------------------------
let ioServer = io()
let messages = document.querySelector('section ul')
let input = document.getElementById('chat-input')

console.log(ioServer)

// Luister naar het submit event
document.getElementById('lower-chat-bar').addEventListener('submit', (event) => {
  event.preventDefault()

  // Als er überhaupt iets getypt is
  if (input.value) {
    // Stuur het bericht naar de server
    ioServer.emit('message', input.value)

    // Leeg het form field
    input.value = ''
  }
})

// Luister naar berichten van de server
ioServer.on('message', (message) => {
  addMessage(message.uid, message.message)
})

/**
 * Impure function that appends a new li item holding the passed message to the
 * global messages object and then scrolls the list to the last message.
 * @param {*} message the message to append
 */
function addMessage(uid, message) {
// er is een uid voor het bericht en de ioServer.id is voor de gebruiker.
  console.log(uid, ioServer.id)
  let messageClass = ''

  if(uid){
    // Alle kinderen van de variabele messages krijgen een li eraan toegevoegd
    const messageConst = messages.appendChild(Object.assign(document.createElement('li'), {textContent: message }))
    
    // als de message id overeenkomt met de ioServer id dan is het bericht van de gebruiker zelf
    // Er wordt een class met de uitlijning aan het variabele messageConst toegevoegd
    if (uid == ioServer.id) {
      messageConst.classList.add('eigen-bericht')
    }
    messages.scrollTop = messages.scrollHeight
  }
}



