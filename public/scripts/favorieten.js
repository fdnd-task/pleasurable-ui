let normalizedX = 0;
let normalizedY = 0;

document.addEventListener("mousemove", function (e) {
    normalizedX = e.clientX / window.innerWidth;
    normalizedY = e.clientY / window.innerHeight;
});

// Functie om nummers te converteren voor leesbaarheid (30000 -> 30.000)
const numberWithPeriods = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Zoek alle prijzen op de pagina en voer de eerdere functie hierop uit
prices = document.querySelectorAll(".price");

prices.forEach((price) => {
    // Haal eerst het euroteken weg, zodat we enkel de waarde overhouden
    // Deze zetten we hierna weer terug met een template literal
    const priceValue = price.innerHTML.toString().replace("€", "");
    price.innerHTML = `€${numberWithPeriods(priceValue)}`;
});

// ---- Confetti effect ----

const confettiDefaults = {
    spread: 120,
    // ticks: 20,
    // gravity: 0,
    // decay: 0.97,
    startVelocity: 10,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shootConfetti() {
    confetti({
        ...confettiDefaults,
        particleCount: 15,
        scalar: 0.8,
        shapes: ["star"],
        origin: { x: normalizedX, y: normalizedY },
    });

    confetti({
        ...confettiDefaults,
        particleCount: 4,
        scalar: 0.4,
        shapes: ["circle"],
        origin: { x: normalizedX, y: normalizedY },
    });
}

// ---- Rating form ----

// Zorg ervoor dat de success states weer verdwijnen na de animatie
document.querySelectorAll(".rating-success .tick").forEach((successEl) => {
    successEl.addEventListener("animationend", () => {
        successEl.classList.remove("draw");
    });
});

// Onderdeel van de Progressive Enhancement feature voor het submitten op de eventListener van de radio buttons, verbergt de submit knop
// Verberg alle submit knoppen op de rating forms
document.querySelectorAll(".rating-form button").forEach((button) => {
    button.classList.add("hidden");
});

// Rating form logica
document.querySelectorAll(".rating-form").forEach((form) => {
    const radios = form.querySelectorAll("input[type=radio]");

    // Voeg een eventListener toe aan elke radio button
    radios.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            const id = form.dataset.id;
            const rating = event.target.value;
            const loaderEl = form.querySelector(".loader");
            const successEl = form.querySelector(".rating-success .tick");

            // Als de radio button gecheckt is (want de 'change' event wordt ook uitgevoerd als een radio button unchecked wordt)
            if (event.target.checked) {
                if (rating == 5) {
                    // Als de rating 5 is, schiet confetti
                    shootConfetti();
                }
                // Roep de RatingHandler functie aan met de juiste parameters
                ratingHandler(id, rating, loaderEl, successEl);
            }
        });
    });
});

// Verberg alle submit knoppen op de rating forms
document.querySelectorAll(".rating-form button").forEach((button) => {
    button.classList.add("hidden");
});

// POST request handler voor het sturen van een rating
function ratingHandler(id, rating, loaderEl, successEl) {
    if (loaderEl.classList.contains("hidden")) {
        loaderEl.classList.remove("hidden");
    }

    try {
        // POST request naar de server met de rating
        // (URL: "/rate/:id/:rating", e.g. "/rate/6/5")
        // throw "Debug error";
        fetch(`/rate/${id}/${rating}`, {
            method: "POST",
        })
            .then((response) => response.json())
            .then((data) => {
                // Verberg de loader en toon de success state
                loaderEl.classList.add("hidden");
                successEl.classList.add("draw");
            });
    } catch (error) {
        // Log eventuele errors en verberg de loader
        console.error(error);
        loaderEl.classList.add("hidden");
        // Gebruik Toastify om een toast notificatie te weergeven als error state
        Toastify({
            text: "Beoordeling niet opgeslagen. Probeer het later nog eens. ",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #ad2429, #9e181c)",
            },
        }).showToast();
    }
}

// ==================================================
// Dialog venster
// ==================================================
const btnLeden = document.querySelector("#btn-leden");
const dialogLeden = document.querySelector("#dialog-leden");
const btnCloseDialog = document.querySelector("#btn-close-dialog");

btnLeden.addEventListener("click", () => {
    dialogLeden.showModal();
});

btnCloseDialog.addEventListener("click", () => {
    dialogLeden.close();
});

/* ---- Footer ---- */

// Voeg een class toe aan de ul elementen om ze zichtbaar te maken als JS werkt
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".footer-col ul").forEach(function (ul) {
        ul.classList.add("js-enabled");
    });

    // Voeg click event listeners toe aan de titels
    document.querySelectorAll(".footer-title").forEach(function (button) {
        button.addEventListener("click", function () {
            let ul = this.nextElementSibling;
            if (ul.style.display === "block") {
                ul.style.display = "none";
            } else {
                ul.style.display = "block";
            }
        });
    });
});
