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

            if (clickedImg) clickedImg.style.viewTransitionName = 'active-memoji';
            if (profileImg) profileImg.style.viewTransitionName = 'active-memoji';

            const transition = document.startViewTransition(() => {
                updateProfilePictureDOM();
                closePopoverPanel();
                cleanUpLoading();
            });

            await transition.finished;
            
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

const container = document.querySelector('.todowrapper');
const cards = document.querySelectorAll('.todocard');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Helper to safely get index only if carousel exists
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

// Scroll directly to center a targeted item
function scrollToCard(index) {
    if (index < 0 || index >= cards.length) return;

    const card = cards[index];
    const containerWidth = container.clientWidth;
    
    const targetScrollLeft = card.offsetLeft - (containerWidth / 2) + (card.clientWidth / 2);

    container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
    });
}

// Carousel listeners safely wrapped
if (container && cards.length > 0) {
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentIndex = getActiveIndex();
            if (currentIndex < cards.length - 1) {
                scrollToCard(currentIndex + 1);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const currentIndex = getActiveIndex();
            if (currentIndex > 0) {
                scrollToCard(currentIndex - 1);
            }
        });
    }

    container.addEventListener('scroll', updateButtonStates, { passive: true });
}

// Safely wrapped comment form logic
const commentForm = document.querySelector('.comment form');
if (commentForm) {
    const formButton = commentForm.querySelector('button');
    const articleComments = document.querySelector('.messages');

    if (formButton) {
        commentForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            console.log('submit');

            formButton.classList.add('loading');
            formButton.textContent = 'Bezig met plaatsen...';

            let formData = new FormData(commentForm);

            try {
                const [response] = await Promise.all([
                    fetch(commentForm.action, {
                        method: commentForm.method,
                        body: new URLSearchParams(formData)
                    }),
                    new Promise(resolve => setTimeout(resolve, 2500))
                ]);

                console.log(response);
                const responseData = await response.text();
                const parser = new DOMParser();
                const responseDOM = parser.parseFromString(responseData, 'text/html');
                const newState = responseDOM.querySelector('.messages');

                if (newState && articleComments) {
                    articleComments.innerHTML = newState.innerHTML;
                }

                formButton.classList.remove('loading');
                formButton.classList.add('success');
                formButton.textContent = '✔ Geplaatst!';

                commentForm.reset();

                setTimeout(() => {
                    formButton.classList.remove('success');
                    formButton.textContent = 'Plaats jouw opmerking';
                }, 2000);

            } catch (err) {
                console.error("Submission failed", err);
                formButton.classList.remove('loading');
                formButton.textContent = 'Fout opgetreden';
            }
        });
    }
}

// Handle disabled states naturally as viewport coordinates move
function updateButtonStates() {
    if (!container || cards.length === 0) return; // Guard clause if carousel isn't on this page
    const currentIndex = getActiveIndex();
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;
}

window.addEventListener('resize', updateButtonStates);

// Initial run to normalize disabled flags on load
updateButtonStates();

// Donate slider + update button
const slider = document.querySelector('.donate');
const output = document.querySelector('.current-value');

if (slider && output) {
    slider.addEventListener('input', (event) => {
        output.textContent = event.target.value;
    });
}