const backToTop = document.querySelector('#backToTop')

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible')
    } else {
      backToTop.classList.remove('visible')
    }
  })


// const backToTop = document.querySelector('#backToTop')

//   window.addEventListener('scroll', function() {
//     if (window.scrollTo({top: 300, left: 0, behavior:"smooth"}) ) {
//       backToTop.classList.add('visible')
//     } else {
//       backToTop.classList.remove('visible')
//     }
//   })
