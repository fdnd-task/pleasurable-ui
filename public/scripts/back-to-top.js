const backToTop = document.querySelector('#backToTop')

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible')
  } else {
    backToTop.classList.remove('visible')
  }
})
