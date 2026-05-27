const links = document.querySelectorAll("a");
const loadingAnimation = document.querySelector(".page-trans-container");

links.forEach(link => {
    link.addEventListener("click", async event => {

        // filters out the backToTop and button animation href
        if (link.id !== "backToTop" && link.id !== "send-animation") {
            loadingAnimation.classList.add("page-is-loading");

            // hides the animation class after time based on animation duration
            // patches issue of permanent loading container showing
            setTimeout(() => {
                loadingAnimation.classList.remove("page-is-loading");
            }, 4000);
        }
    })
})