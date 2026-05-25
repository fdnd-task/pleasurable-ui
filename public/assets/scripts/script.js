console.log("test");

document.addEventListener("submit", function(event) {

  const form = event.target

  if (!form.classList.contains("like-form")) return

  event.preventDefault()
