const ranges = document.querySelectorAll('[type="range"]');
// const output = document.querySelector('.selected article');
const jsConfetti = new JSConfetti()

ranges.forEach((range, index) => {
    range.addEventListener('change', function(event) {
        console.log(range.value)
        console.log(`Slider ${index+1} is gewijzigd`); 
        const output = document.querySelector(`.selected .selected-${index+1}`);

        if (range.value == 5){
            console.log('jup')
            output.style.setProperty('--range-clr', "rgb(88, 187, 88)")

            jsConfetti.addConfetti({
                emojis: ['👍', '🌱', '💚', '✅'],
                emojiSize: 100,
                confettiNumber: 30,
            })
        }

        if (range.value == 4){
            console.log('jup')
            output.style.setProperty('--range-clr', "#8EC58E")
        }
        if (range.value == 3){
            console.log('jup')
            output.style.setProperty('--range-clr', "#98C098")
        }
        if (range.value == 2){
            console.log('jup')
            output.style.setProperty('--range-clr', "#A1BDA1")
        }
        if (range.value == 1){
            console.log('jup')
            output.style.setProperty('--range-clr', "#ACB8AC")
        }
        if (range.value == 0){
            console.log('jup')
            output.style.setProperty('--range-clr', "#DDDDDD")
        }
        if (range.value == -1){
            console.log('jup')
            output.style.setProperty('--range-clr', "#B9ABAB")
        }
        if (range.value == -2){
            console.log('jup')
            output.style.setProperty('--range-clr', "#BDA1A1")
        }
        if (range.value == -3){
            console.log('jup')
            output.style.setProperty('--range-clr', "#C19897")
        }
        if (range.value == -4){
            console.log('jup')
            output.style.setProperty('--range-clr', "#C58E8E")
        }
        if (range.value == -5){
            console.log('nope')
            output.style.setProperty('--range-clr', "rgb(187 88 88)")
            jsConfetti.addConfetti({
                emojis: ['☹️', '💔', '❌', '👎'],
                emojiSize: 100,
                confettiNumber: 30,
            })
        }
    })
})





