const menu = document.querySelector('nav')
const button = document.querySelector('.fdnd-button')
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