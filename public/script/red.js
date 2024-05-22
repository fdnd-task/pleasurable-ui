
// forms
let forms = document.querySelectorAll("form");
const formBTN = document.querySelectorAll('button[type="submit"]');
const testBTN = document.querySelector(".inleiding_text");

// date
const CT = document.querySelector('header .h-main-datum strong');

// mobile menu 
const menuBtn = document.querySelector(".menu-open");
const menuExitBtn = document.querySelector(".menu-exit");
const menuWindow = document.querySelector("#mobile-menu-window");
const showMenu = document.querySelector(".showMenu");


//forms
if (formBTN) {
	forms.forEach((form) => {
		form.addEventListener("submit", function (e) {
			let form = this;
			let data = new FormData(this);
			// console.log(data,"and",this)
			data.append("enhanced", true);

			// add loader
			this.classList.add('loader');

			fetch(this.action, {
				body: new URLSearchParams(data),
				method: this.method,
			})
				.then(function (rawStream) {
					return rawStream.text();
					// loading state
					this.classList.remove('loader');

					// console.log('[3]',response.text());
				})
				.then(function (text) {

					// view transition for form
					if(!document.startViewTransition){
						//remove loader
						form.innerHTML = text;
						form.classList.remove('loader');
					}else{
						document.startViewTransition(() => {
							form.innerHTML = text;
							form.classList.remove('loader');
						})
					}

					
					
					// add new sate to buttons
				})
				.catch((x) => {
					// Handle error if fetching data fails
					// Add error state
					alert("something went wrong", x);
				});

				

			e.preventDefault();
			testBTN.addEventListener("click", () => {
				console.log(forms);
			});
			
		});
	});
	
}




if(CT){
	const currentDate = new Date();
	const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

	let dateString = currentDate.toLocaleDateString('nl-US', options);
	dateString = dateString.replace(' ', ', ') 
	CT.textContent = dateString;
}
// check temporal api 

// Mobile window function

menuBtn?.addEventListener("click", function (e) {
	menuWindow.classList.add("showMenu");
});

menuExitBtn?.addEventListener("click", (e) => {
	menuWindow.classList.remove("showMenu");
});




