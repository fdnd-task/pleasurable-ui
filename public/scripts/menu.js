const menu = document.querySelector('#menu')
const body = document.body
const mainContent = document.querySelectorAll('body > *:not(#menu)')

menu.addEventListener("toggle", function () {
    const isOpen = menu.matches(":popover-open");

    if (isOpen) {
        requestAnimationFrame(() => menu.classList.add("show"));

        body.style.overflow = 'hidden'
        mainContent.forEach(el => {
            el.inert = true
        })

    } else {
        requestAnimationFrame(() => menu.classList.remove("show"));

        body.style.overflow = ''
        mainContent.forEach(el => {
            el.inert = false
        })
    }
})