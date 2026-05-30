const backToTopButton = document.querySelector('#back-to-top-button')
const scrollContainer = document.querySelector('main')

const hideButton = () => {
	backToTopButton.classList.add('is-hiding')

	backToTopButton.addEventListener('animationend', () => {
		backToTopButton.classList.remove('is-visible', 'is-hiding')
	}, { once: true })
}

scrollContainer.addEventListener('scroll', () => {
	const shouldShow = scrollContainer.scrollTop > 300

	if (shouldShow && !backToTopButton.classList.contains('is-visible')) {
		backToTopButton.classList.add('is-visible')
	} else if (!shouldShow && backToTopButton.classList.contains('is-visible')) {
		hideButton()
	}
})

backToTopButton.addEventListener('click', () => {
	scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
})