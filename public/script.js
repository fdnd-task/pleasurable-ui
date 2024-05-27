// Deze code is voor het zij-menu die over de gehele website komt

const menu = document.querySelector('.crossnav')
const button = document.querySelector('.menu-button')
const close = document.querySelector('path')
const filterdiv = document.querySelector('#menu')

			button.addEventListener('click', function(){
  			menu.classList.add('show');
			filterdiv.classList.toggle('filter');
});

			close.addEventListener('click', function(){
  			menu.classList.remove('show')
			filterdiv.classList.remove('filter');
});
// einde menu script

// variables sdg
const appear = document.querySelector(".quantityChoice");
appear.style.display = 'block';

// functies sdg
function checked(){
    document.getElementById('selected').innerHTML = getCheckboxCount();
  }
  
function getCheckboxCount() {
    return document.querySelectorAll('input[type=checkbox]:checked').length;
}
  
document.querySelectorAll("input").forEach(input=>{
    input.onclick = () => checked();
});

//dashboard scripting

document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');

    options.forEach(option => {
        option.addEventListener('click', function() {
            // Reset de achtergrondkleur en tekstkleur van alle opties behalve de geselecteerde optie
            options.forEach(opt => {
                if (opt !== option) {
                    opt.style.backgroundColor = 'white';
                    opt.querySelector('span').style.color = '#808080';
                }
            });

            // Set de achtergrondkleur en tekstkleur van de geklikte optie naar paars en wit
            option.style.backgroundColor = '#AD97C9';
            option.querySelector('span').style.color = 'white';
        });
    });
});


// NIEUWE FUNCTIE VOOR FORM LATEN INLADEN 
const addForm = document.querySelector('form.form');
const successMessage = document.getElementById('successMessage');
const stakeholder = [];

addForm.addEventListener('submit', submitAddFormHandler);

function submitAddFormHandler(event) {
    console.log('form submitted!');
    const messageText = document.getElementById("name").value;
    const selectedInput = document.querySelector('input[type="radio"]:checked');

  

    if (selectedInput) {
        const selectedType = selectedInput.getAttribute("name");
        
        console.log("Geselecteerde naam: " + selectedType);
        stakeholder.push("Naam: " + messageText, "Type: " + selectedType);
        
        let form = this;
        let data = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: new URLSearchParams(data),
          }
        )

    } else {
        alert("Selecteer een type!"); // Waarschuw als er geen type is geselecteerd (kan nog verandert worden met n divje)
        return; // Stop de functie hier als er geen type is geselecteerd
    }

    // Als er een type is geselecteerd, stuur het formulier door
    successMessage.style.display = 'block';
    setTimeout(function () {
        successMessage.style.display = 'none';
    }, 5000);

    event.preventDefault();
}
