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

// Clientside POST ratings
document.querySelectorAll(".rating-form").forEach((form) => {
  // Dit is een Progressive Enhancement feature om de form te submitten met een eventListener op de radio buttons, maar dit kreeg ik niet werkend
  // FIXME: Zorg dat de form gesubmit wordt als een radio button geselecteerd wordt, en verberg de submit knop (onderaan de code, buitend de form forEach loop)

  // const radios = form.querySelectorAll("input[type=radio]");
  // radios.forEach((radio) => {
  //   radio.addEventListener("change", (event) => {
  //     if (event.target.checked) {
  //       form.submit();
  //     }
  //   });
  // });

  // Succes state element
  const successElement = form.querySelector(".rating-success .tick");

  // Zorg ervoor dat de success state weer verdwijnt na de animatie
  successElement.addEventListener("animationend", () => {
    successElement.classList.remove("draw");
  });

  // On submit event
  form.addEventListener("submit", (event) => {
    // Loading state
    const loader = form.querySelector(".loader");

    if (loader.classList.contains("hidden")) {
      loader.classList.remove("hidden");
    }

    // Clientside fetch request
    const id = form.dataset.id;
    const rating = form.querySelector("input[name=rating]:checked").value;

    try {
      // POST request naar de server met de rating 
      // (URL: "/rate/:id/:rating", e.g. "/rate/6/5")
      fetch(`/rate/${id}/${rating}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          // Verberg de loader en toon de success state
          loader.classList.add("hidden");
          successElement.classList.add("draw");
        });
    } catch (error) {
      // Log eventuele errors en verberg de loader
      // TODO: Error state
      console.error(error);
      loader.classList.add("hidden");
    }

    event.preventDefault();
  });
});

// Onderdeel van de Progressive Enhancement feature voor het submitten op de eventListener van de radio buttons, verbergt de submit knop

// document.querySelectorAll(".rating-form button").forEach((button) => {
//   button.classList.add("hidden");
// });
