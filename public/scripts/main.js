const loginBtn = document.querySelector('.btn-green')
const requiredInputs = document.querySelectorAll('[required]')
const emailInput = document.querySelector('[type="email"]')
const formLogin = document.querySelector('.login-form')
const jsConfetti = new JSConfetti()

formLogin.addEventListener('submit', handleSubmit); 

function handleSubmit(event) {
    if(validateForm()) {
        event.preventDefault(); 
        jsConfetti.addConfetti({
            confettiNumber: 100,
        })
        setTimeout(() => {       formLogin.submit();      }, 1000);
    }
    function validateForm() {    return true; } 
    
}
