const loaderBtn = document.querySelector('.loader');
const allOptions = document.querySelectorAll('.options-container button');

const triggerAnimation = (event) => {
    const clickedBtn = event.currentTarget;
    const targetUrl = clickedBtn.getAttribute('data-url');
    
    if (loaderBtn) {
        loaderBtn.setAttribute('href', targetUrl);
        loaderBtn.classList.remove('shownow', 'ready');
        void loaderBtn.offsetWidth;
        loaderBtn.classList.add('shownow');
    }
};

allOptions.forEach(btn => {
    btn.addEventListener('click', triggerAnimation);
});

const memojiForm = document.getElementById('memojiForm');

if (memojiForm) {
    memojiForm.addEventListener('click', async (event) => {
        const clickedBtn = event.target.closest('.memoji-choice-btn');
        if (!clickedBtn) return;

        event.preventDefault();

        const memojiId = clickedBtn.value;
        const targetUrl = memojiForm.action;

        // Start Loader
        if (loaderBtn) {
            loaderBtn.classList.remove('shownow', 'ready');
            void loaderBtn.offsetWidth; 
            loaderBtn.classList.add('shownow');
        }

        try {
            const response = await fetch(targetUrl, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify({ memojiId: memojiId }),
            });

            if (response.ok) {
                window.location.href = '/account'; 
            } else {
                throw new Error("Patch failed");
            }
        } catch (error) {
            console.error("Fetch error, falling back:", error);
            memojiForm.submit(); // Progressive Enhancement
        }
    });
}

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