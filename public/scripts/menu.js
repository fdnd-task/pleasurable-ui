const menu = document.querySelector('nav details')
const body = document.querySelector('body')
// Select the main content block that should be inert when menu opens
// Use querySelectorAll to target main, footer, etc. below the header/nav
const mainContent = document.querySelectorAll('body > main, body > footer, .article-layout')
const navBar = document.querySelectorAll('header ul')

// scrolllock & tabblock
menu.addEventListener("toggle", function () {
    if (menu.open) {
        body.style.overflow = 'hidden'
        mainContent.forEach(el => el.inert = true)
        navBar.forEach(link => {
            link.inert = true
        });
    } else {
        body.style.overflow = ''
        mainContent.forEach(el => el.inert = false)
        navBar.forEach(link => {
            link.inert = false
        });
    }
})

// pressing escape closes the hamburger menu
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        menu.removeAttribute('open')
    }
})
