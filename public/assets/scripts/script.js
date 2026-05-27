const aanmeldenknop = document.getElementById("popup-knop")
const openknop = document.getElementById("popup-melden")

aanmeldenknop.addEventListener("click", function () {
    openknop.classList.toggle("open");
    aanmeldenknop.classList.toggle("close");
});
