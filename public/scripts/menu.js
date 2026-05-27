const menu = document.querySelector('#menu')
const body = document.body
const mainContent = document.querySelectorAll('body > *:not(#menu)')
const closeButton = document.querySelector('#menu .popover-button')


// Only when JS is active set it to manual
menu.setAttribute('popover', 'manual')
menu.classList.add('hide')

menu.addEventListener("toggle", function () {
    const isOpen = menu.matches(":popover-open");

    if (isOpen) {
        menu.classList.add("show")

        body.style.overflow = 'hidden'
        mainContent.forEach(el => {
            el.inert = true
        })
    }
    else {
        menu.classList.remove("show")
        body.style.overflow = '';
        mainContent.forEach(el => el.inert = false);
    }
})

// listen for closes
closeButton.addEventListener("click", closePopover)
// close by pressing esc
document.addEventListener("keydown", closePopover)

// close by clicking outside of it
// 
// Its tricky because you can't listen to mainContent because the backdrop is covering it
// And backdrop cannot be selected with the queryselector
document.addEventListener("click", (event) => {
    // first I ask where the menu is on the website and how big it is
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    const rect = menu.getBoundingClientRect();
    const clickOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
    if (clickOutside) {
        closePopover()
    }
})

// close animation
function closePopover(event) {
    if (menu.matches(":popover-open")) {
        if (event) {
            event.preventDefault()
        }
        // Stops the popover from instantly closing
        menu.classList.remove("show");
        body.style.overflow = '';
        mainContent.forEach(el => el.inert = false);
        // now hide the popover when the going out animation has finished
        setTimeout(() => menu.hidePopover(), 500);
    }
}
