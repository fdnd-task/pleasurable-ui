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

const commentForm = document.querySelector('.comment form')

const formButton = commentForm.querySelector('button')
const articleComments = document.querySelector('.messages')


commentForm.addEventListener('submit', async function (event) {

    event.preventDefault()
    console.log('submit')

    formButton.classList.add('loading')
    formButton.textContent = 'Verzenden...'

    let formData = new FormData(commentForm);

    const [response] = await Promise.all([
        fetch(commentForm.action, {
            method: commentForm.method,
            body: new URLSearchParams(formData)
        }),
        new Promise(resolve => setTimeout(resolve, 2500))
    ])

    console.log(response)

    const responseData = await response.text()

    const parser = new DOMParser()
    const responseDOM = parser.parseFromString(responseData, 'text/html')

    const newState = responseDOM.querySelector('.messages')


    if (newState) {
        articleComments.innerHTML = newState.innerHTML
    }

    formButton.classList.remove('loading')
    formButton.classList.add('success')
    formButton.textContent = '✔ Verstuurd!'

    commentForm.reset()

    setTimeout(() => {

        formButton.classList.remove('success')

        formButton.textContent = 'Verzenden'

    }, 2000)
})