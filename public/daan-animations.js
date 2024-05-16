// personal page load animations
gsap.from('main', {duration: 0.7, y: '100%', ease: 'ease-in'});
gsap.from('h1', {duration: 0.6, y: '100%', delay: 0.7, ease: 'ease-out'});
gsap.from('.hamburger-menu', {duration: 0.5, y: '-150%', delay: 0.7, ease: 'bounce'});
gsap.from('.oba-logo', {duration: 0.8, y: '-130%', delay: 0.7, ease: 'bounce'});


// timeline for the carousel animation
const carouselTimeline = gsap.timeline({defaults: { duration: 1 }});

carouselTimeline
    .from('.for-you', {duration: 0.5, x: '-100%', delay: 0.7, ease: 'ease-in'})
    .from('.favourites', {duration: 0.5, x: '100%', ease: 'ease-in'})
    .from('.borrowed', {duration: 0.5, x: '-100%', ease: 'ease-in'});

// timeline for for you
const forYouTimeline = gsap.timeline({defaults: { duration: 1 }});

// forYouTimeline
// .from('.for-you-details', {duration: 0.7, y: '100%', ease: 'ease-in', delay: 0.1});


// detail buttons
const forYouDetailsButton = document.getElementById('forYoudetailsButton');
const favoritesDetailsButton = document.getElementById('favoritesButton');
const borrowedBooksDetailsButton = document.getElementById('borrowedBooksButton');

// elementen voor de detail functie
const forYouDetails = document.querySelector('.for-you-details');
const favoritesDetails = document.querySelector('.favorites-details');
const borrowedBooksDetails = document.querySelector('.borrowed-books-details');
const contentWrapperActive = document.querySelector('.content-wrapper');
const pageText = document.querySelector('.page');

// click events
// for you
forYouDetailsButton.addEventListener('click', () => {
    // Zorg ervoor dat de animaties in de timeline 3x zo snel gaan
    carouselTimeline.timeScale(2);

    // Reverse de animatie op de timeline met .reverse
    carouselTimeline.reverse().eventCallback("onReverseComplete", () => {
        detailsForYouActive();
        activeContentWrapper();
    });
});

// favorites
favoritesDetailsButton.addEventListener('click', () => {
    // Zorg ervoor dat de animaties in de timeline 3x zo snel gaan
    carouselTimeline.timeScale(2);

    // Reverse de animatie op de timeline met .reverse
    carouselTimeline.reverse().eventCallback("onReverseComplete", () => {
        detailsFavoritesActive()
        activeContentWrapper();
    });
});

// borrowed books
borrowedBooksDetailsButton.addEventListener('click', () => {
    // Zorg ervoor dat de animaties in de timeline 3x zo snel gaan
    carouselTimeline.timeScale(2);

    // Reverse de animatie op de timeline met .reverse
    carouselTimeline.reverse().eventCallback("onReverseComplete", () => {
        detailsBorrowedBooksActive();
        activeContentWrapper();
    });
});


// details active functions

// for you
function detailsForYouActive(){
    forYouDetails.classList.add('for-you-details-active');
    pageText.innerHTML = 'Voor Jou'
}

//favorites
function detailsFavoritesActive(){
    favoritesDetails.classList.add('favorites-details-active');
    pageText.innerHTML = 'Favorieten'
}

// borrowed books
function detailsBorrowedBooksActive(){
    borrowedBooksDetails.classList.add('borrowed-books-details-active');
    pageText.innerHTML = 'Geleende Boeken'
}

// content wrapper
function activeContentWrapper(){
    contentWrapperActive.classList.add('content-wrapper-active');
    console.log('wrapper');
}

