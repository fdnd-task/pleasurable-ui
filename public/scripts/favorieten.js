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

// ---- Rating form ----

// Zorg ervoor dat de success states weer verdwijnen na de animatie
document.querySelectorAll(".rating-success .tick").forEach((successEl) => {
    successEl.addEventListener("animationend", () => {
        successEl.classList.remove("draw");
    });
});

// Verberg alle submit knoppen op de rating forms
document.querySelectorAll(".rating-form button").forEach((button) => {
    button.classList.add("hidden");
});

// Rating form logica wanneer de submit knop gebruikt wordt
document.querySelectorAll(".rating-form").forEach((form) => {
    // Dit is een Progressive Enhancement feature om de form te submitten met een eventListener op de radio buttons, maar dit kreeg ik niet werkend
    // FIXME: Zorg dat de form gesubmit wordt als een radio button geselecteerd wordt, en verberg de submit knop (onderaan de code, buitend de form forEach loop)

    const radios = form.querySelectorAll("input[type=radio]");

    radios.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            const id = form.dataset.id;
            const rating = event.target.value;
            const loaderEl = form.querySelector(".loader");
            const successEl = form.querySelector(".rating-success .tick");

            if (event.target.checked) {
                // Roep de RatingHandler functie aan met de juiste parameters
                RatingHandler(id, rating, loaderEl, successEl);
            }
        });
    });
});

// Zorg ervoor dat de success state weer verdwijnt na de animatie
successElement.addEventListener("animationend", () => {
    successElement.classList.remove("draw");
});

// Verberg alle submit knoppen op de rating forms
document.querySelectorAll(".rating-form button").forEach((button) => {
    button.classList.add("hidden");
});

// POST request handler voor het sturen van een rating
function RatingHandler(id, rating, loaderEl, successEl) {
    if (loaderEl.classList.contains("hidden")) {
        loaderEl.classList.remove("hidden");
    }

    try {
        // POST request naar de server met de rating
        // (URL: "/rate/:id/:rating", e.g. "/rate/6/5")
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
        // Gebruik Toastify om een toast notificatie te weergeven als error state
        loaderEl.classList.add("hidden");
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
