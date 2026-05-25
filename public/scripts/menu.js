const menu = document.querySelector('#menu')
const body = document.body
const mainContent = document.querySelectorAll('body > *:not(#menu)')
const closeButton = document.querySelector('#menu .popover-button')
console.log(closeButton)

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
// V doesn't work
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closePopover()
    }
})

// close animation
function closePopover(event) {
    if (menu.matches(":popover-open")) {
        // Stops the popover from instantly closing
        event.preventDefault();
        menu.classList.remove("show");
        body.style.overflow = '';
        mainContent.forEach(el => el.inert = false);
        // now hide the popover when the going out animation has finished
        setTimeout(() => menu.hidePopover(), 500);
    }
}



// tried to auto close after transition but it wouldn't work
// menu.addEventListener("transitionend", function () {
//     console.log('trans')
//     const isOpen = menu.matches(":popover-open");

//     if (!isOpen) {
//         console.log('trans2')
//         menu.hidePopover();
//     }
// });