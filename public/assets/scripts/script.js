console.log("test");

document.addEventListener("submit", function(event) {

  const form = event.target

  if (!form.classList.contains("like-form")) return

  event.preventDefault()

  const feedbackPopup = document.querySelector(".feedback-popup")

  feedbackPopup.classList.remove("hidden")

  setTimeout(function() {

    feedbackPopup.classList.add("hidden")

  }, 2000)

})
