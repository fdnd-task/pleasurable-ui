// Deze code is voor het zij-menu die over de gehele website komt

const menu = document.querySelector('.crossnav')
const button = document.querySelector('.menu-button')
const close = document.querySelector('path')
const filterdiv = document.querySelector('main div:first-child')

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
