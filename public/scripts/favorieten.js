// Prijzen omzetten naar juiste formaat
const numberWithPeriods = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

prices = document.querySelectorAll(".price");

prices.forEach((price) => {
  const priceValue = price.innerHTML.toString().replace("€", "");
  price.innerHTML = `€${numberWithPeriods(priceValue)}`;
});

// Clientside POST ratings
document.querySelectorAll(".rating-form").forEach((form) => {
  const successElement = form.querySelector(".rating-success .tick");

  // const radios = form.querySelectorAll("input[type=radio]");

  //   radios.forEach((radio) => {
  //     radio.addEventListener("change", (event) => {
  //       if (event.target.checked) {
  //         form.submit();
  //       }
  //     });
  //   });

  successElement.addEventListener("animationend", () => {
    successElement.classList.remove("draw");
  });

  form.addEventListener("submit", (event) => {
    const id = form.dataset.id;
    const rating = form.querySelector("input[name=rating]:checked").value;

    const loader = form.querySelector(".loader");

    if (loader.classList.contains("hidden")) {
      loader.classList.remove("hidden");
    }

    // Log the request on the clientside console
    console.log(`Sent POST request 
    houseID: ${id} 
    rating: ${rating}`);

    try {
      fetch(`/rate/${id}/${rating}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          loader.classList.add("hidden");
          successElement.classList.add("draw");
        });
    } catch (error) {
      console.error(error);
      loader.classList.add("hidden");
    }

    event.preventDefault();
  });
});

document.querySelectorAll(".rating-form button").forEach((button) => {
  // button.classList.add("hidden");
});
