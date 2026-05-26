const animationButtons = document.querySelectorAll(".primary-button.send-animation");

animationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        button.classList.add("is-loading");

        setTimeout(() => {
            button.classList.remove("is-loading");
            button.classList.add("is-success");
            button.textContent = "Verzonden!";
        }, 4000);

        setTimeout(() => {
            button.classList.remove("is-success");
            button.textContent = "Verzend";
        }, 8000);

    });
}); 

document.querySelector(".test").addEventListener("click", (event) =>{
    event.preventDefault();
    const loadingAnimation = document.querySelector(".page-trans-container");
    loadingAnimation.classList.add("page-is-loading");

            setTimeout(() => {
            loadingAnimation.classList.remove("page-is-loading");
        }, 4500);
})

// const links = document.querySelectorAll("a");

// links.forEach(button => {
//     button.addEventListener('click', (event) => {
//         event.preventDefault();

//         document.querySelector("body").classList.add("is-loading");

//     });
// });