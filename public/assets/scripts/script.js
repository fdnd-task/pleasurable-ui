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

const container = document.querySelector('.todowrapper');
const cards = document.querySelectorAll('.todocard');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


// veldbeheer page
// **************
// **************
// **************

// Prev and next buttons carousel
if (container && cards.length > 0) {
    
    // Checks center intersecting geometries to determine active card index
    function getActiveIndex() {
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
        
        // Exact offset math accounting for parent alignment bounds
        const targetScrollLeft = card.offsetLeft - (containerWidth / 2) + (card.clientWidth / 2);

        container.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
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

    // Handle disabled states naturally as viewport coordinates move
    function updateButtonStates() {
        const currentIndex = getActiveIndex();
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;
    }

    container.addEventListener('scroll', updateButtonStates, { passive: true });
    window.addEventListener('resize', updateButtonStates);
    
    // Initial run to normalize disabled flags on load
    updateButtonStates();
}


// Donate slider + update button
const slider = document.querySelector('.donate');
const output = document.querySelector('.current-value');

slider.addEventListener('input', (event) => {
    output.textContent = event.target.value;
});