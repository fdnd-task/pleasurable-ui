// personal page load animations
gsap.from('main', {duration: 0.7, y: '100%', ease: 'ease-in'})
gsap.from('h1', {duration: 0.6, y: '100%', delay: 0.7, ease: 'ease-out'})
gsap.from('.hamburger-menu', {duration: 0.5, y: '-150%', delay: 0.7, ease: 'bounce'})
gsap.from('.oba-logo', {duration: 0.8, y: '-130%', delay: 0.7, ease: 'bounce'})


// timeline for the carousel animation
const carouselTimeline = gsap.timeline({defaults: { duration: 1 }})

carouselTimeline
    .from('.for-you', {duration: 0.5, x: '-100%', delay: 0.7, ease: 'ease-in'})
    .from('.favourites', {duration: 0.5, x: '100%', ease: 'ease-in'})
    .from('.borrowed', {duration: 0.5, x: '-100%', ease: 'ease-in'})






// selecteer de button
const forYouDetailsButton = document.getElementById('forYoudetails')
const forYouDetails = document.querySelector('.for-you-details')
const contentWrapperActive = document.querySelector('.content-wrapper')

// zet er een click event op en selecteer het object timeline
forYouDetailsButton.addEventListener('click', () => {
    // zorgt ervoor dat de animaties in de timeline 3x zo snel gaan
    carouselTimeline.timeScale(2)
    // reverse de animatie op de timeline met .reverse
    carouselTimeline.reverse()

    detailsForYouActive()
})

function detailsForYouActive(){
    forYouDetails.classList.add('for-you-details-active')
    forYouDetails.classList.remove('for-you-details')
    contentWrapperActive.classList.add('content-wrapper-active')
    console.log('ik werk')
}

function activeContentWrapper(){
    contentWrapperActive.classList.add('content-wrapper-active')
    console.log('wrapper')
}