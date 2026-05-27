// add loading state
const deleteForms = document.querySelectorAll(".delete-form")
const suggestieLijst = document.querySelector(".collection-suggesties")


deleteForms.forEach((deleteForm) => {
  deleteForm.addEventListener("submit", async function (event) {
    const deleteKnop = deleteForm.querySelector(".delete")
    const suggestie = document.querySelector(`li:has(form[data-enhanced="${deleteForm.getAttribute('data-enhanced')}"])`)
    event.preventDefault()

    deleteKnop.classList.add("loading")
    deleteKnop.textContent = ""

    let formData = new FormData(deleteForm);

    const response = await fetch(deleteForm.action, {
      method: deleteForm.method,
      body: new URLSearchParams(formData)
    })

    suggestie.remove();

  })
})