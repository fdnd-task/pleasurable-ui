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