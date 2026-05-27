const memojiForm = document.getElementById('memojiForm');
const loaderBtn = document.querySelector('.loader');

if (memojiForm) {
    memojiForm.addEventListener('click', async (event) => {
        const clickedBtn = event.target.closest('.memoji-choice-btn');
        if (!clickedBtn) return;

        event.preventDefault();

        const memojiId = clickedBtn.value;
        const targetUrl = memojiForm.action;
        
        const clickedImg = clickedBtn.querySelector('img');
        const localSourceUrl = clickedImg ? clickedImg.src : null;

        const pictureContainer = document.querySelector('.user-data picture');
        const profileImg = pictureContainer?.querySelector('img');

        if (!localSourceUrl) return;

        clickedBtn.classList.add('is-loading');
        if (loaderBtn) {
            loaderBtn.classList.add('shownow');
        }

        // Inside Helper: Update DOM Changes
        const updateProfilePictureDOM = () => {
            if (!pictureContainer) return;
            
            const sources = pictureContainer.querySelectorAll('source');
            sources.forEach(source => {
                source.srcset = localSourceUrl; 
            });

            if (profileImg) {
                profileImg.src = localSourceUrl;
            }
        };

        // Inside Helper: Popover dismissal
        function closePopoverPanel() {
            const popoverEl = document.getElementById('profiselector');
            if (popoverEl && typeof popoverEl.hidePopover === 'function') {
                popoverEl.hidePopover();
            } else if (popoverEl && typeof popoverEl.close === 'function') {
                popoverEl.close();
            }
        }

        // Inside Helper: Reset states
        function cleanUpLoading() {
            clickedBtn.classList.remove('is-loading');
            if (loaderBtn) {
                loaderBtn.classList.remove('shownow');
            }
        }

        try {
            const response = await fetch(targetUrl, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify({ 
                    memojiId: memojiId,
                    imageUrl: localSourceUrl
                }),
            });

            if (!response.ok) throw new Error("Database patch operation failed");
            
            const data = await response.json();
            const confirmedUrl = data.newMemojiUrl;

            const updateProfilePictureDOM = () => {
                if (!pictureContainer) return;
                
                const sources = pictureContainer.querySelectorAll('source');
                sources.forEach(source => {
                    source.srcset = confirmedUrl;
                });

                if (profileImg) {
                    profileImg.src = confirmedUrl;
                }
            };

            if (!document.startViewTransition) {
                updateProfilePictureDOM();
                closePopoverPanel();
                cleanUpLoading();
                return;
            }

            // Assign transition names to both elements before the transition begins
            if (clickedImg) clickedImg.style.viewTransitionName = 'active-memoji';
            if (profileImg) profileImg.style.viewTransitionName = 'active-memoji';

            const transition = document.startViewTransition(() => {
                updateProfilePictureDOM();
                closePopoverPanel();
                cleanUpLoading();
            });

            await transition.finished;
            
            // Clean up transition names after the fade completes
            if (clickedImg) clickedImg.style.viewTransitionName = '';
            if (profileImg) profileImg.style.viewTransitionName = '';

        } catch (error) {
            cleanUpLoading();
            memojiForm.submit(); 
        }

        function closePopoverPanel() {
            const popoverEl = document.getElementById('profiselector');
            if (popoverEl && typeof popoverEl.hidePopover === 'function') {
                popoverEl.hidePopover();
            } else if (popoverEl && typeof popoverEl.close === 'function') {
                popoverEl.close();
            }
        }

        function cleanUpLoading() {
            clickedBtn.classList.remove('is-loading');
            if (loaderBtn) {
                loaderBtn.classList.remove('shownow');
            }
        }
    });
}

function getActiveIndex() {
    if (!container || cards.length === 0) return 0;
    
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + (containerRect.width / 2);
    
    let closestIndex = 0;
    let minimumDistance = Infinity;

    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + (cardRect.width / 2);
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < minimumDistance) {
            minimumDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}

function scrollToCard(index) {
    if (!container || index < 0 || index >= cards.length) return;

    const card = cards[index];
    const containerWidth = container.clientWidth;
    const targetScrollLeft = card.offsetLeft - (containerWidth / 2) + (card.clientWidth / 2);

    container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
    });
}

function updateButtonStates() {
    if (!container || cards.length === 0) return; 
    const currentIndex = getActiveIndex();
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;
}

// Initialize Carousel Event Listeners
if (container && cards.length > 0) {
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentIndex = getActiveIndex();
            if (currentIndex < cards.length - 1) {
                scrollToCard(currentIndex + 1);
            }
        });
    }

    // Click Handlers
    nextBtn.addEventListener('click', () => {
        const currentIndex = getActiveIndex();
        if (currentIndex < cards.length - 1) {
            scrollToCard(currentIndex + 1);
        }
    });

    prevBtn.addEventListener('click', () => {
        const currentIndex = getActiveIndex();
        if (currentIndex > 0) {
            scrollToCard(currentIndex - 1);
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
    formButton.textContent = 'Bezig met plaatsen...'

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
    formButton.textContent = '✔ Geplaatst!'

    commentForm.reset()

    setTimeout(() => {

        formButton.classList.remove('success')

        formButton.textContent = 'Plaats jouw opmerking'

    }, 2000)
})

    // Handle disabled states naturally as viewport coordinates move
    function updateButtonStates() {
        const currentIndex = getActiveIndex();
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;
    }

    container.addEventListener('scroll', updateButtonStates, { passive: true });
    window.addEventListener('resize', updateButtonStates);
    
    // Normalize disabled flags immediately on load
    updateButtonStates();
}

if (slider && output) {
    slider.addEventListener('input', (event) => {
        output.textContent = event.target.value;
    });
}

if (commentForm) {
    const formButton = commentForm.querySelector('button');
    const articleComments = document.querySelector('.messages');

    if (formButton) {
        commentForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            formButton.classList.add('loading');
            formButton.textContent = 'Bezig met plaatsen...';

slider.addEventListener('input', (event) => {
    output.textContent = event.target.value;
});
