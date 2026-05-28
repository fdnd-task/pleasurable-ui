// variables
const commentForm = document.querySelector(".comment-form")
const formButton = commentForm.querySelector("button")
const commentsContainer = document.querySelector(
  "#comments .recent-comments-container",
)
const originalButtonText = formButton.textContent

// code logic
commentForm.addEventListener("submit", async function (event) {
  event.preventDefault()

  formButton.classList.add("loading")
  formButton.textContent = "Verzenden..."
  formButton.textContent = "✅"

  const formData = new FormData(commentForm)

  try {
    const response = await fetch(commentForm.action, {
      method: commentForm.method,
      body: new URLSearchParams(formData),
    })

    if (!response.ok) {
      console.error("Fout bij opslaan reactie:", response.status)
      formButton.textContent = "❌"
      formButton.classList.remove("loading")
      return
    }

    const responseData = await response.text()

    const parser = new DOMParser()
    const responseDOM = parser.parseFromString(responseData, "text/html")

    const newComment = responseDOM.querySelector(
      "#comments article.single-comment",
    )

    if (newComment && commentsContainer) {
      const emptyState = commentsContainer.querySelector(".empty-state")
      if (emptyState) {
        emptyState.remove()
      }

      commentsContainer.insertAdjacentHTML("afterbegin", newComment.outerHTML)

      commentForm.reset()
    }
  } catch (err) {
    console.error("Netwerkfout:", err)
  } finally {
    console.log("Loading state weghalen")
    formButton.classList.remove("loading")

    setTimeout(() => {
      formButton.textContent = originalButtonText
    }, 1000)
  }
})
