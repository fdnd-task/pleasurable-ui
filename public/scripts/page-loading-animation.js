const links = document.querySelectorAll("a");
const loadingAnimation = document.querySelector(".page-trans-container");

links.forEach(link => {
    link.addEventListener("click", async event => {
        loadingAnimation.classList.add("page-is-loading");
    })
})