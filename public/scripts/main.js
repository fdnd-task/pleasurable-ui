const ranges = document.querySelector('.hi');
const output = document.querySelector('.selected article');
const jsConfetti = new JSConfetti()

ranges.addEventListener('change', function(event) {
    console.log(ranges.value)
    
    if (ranges.value == 5){
        console.log('jup')
        output.style.setProperty('--range-clr', "rgb(88, 187, 88)")
        

        // Edit given parameters
        jsConfetti.addConfetti({
            emojis: ['👍', '🌱', '💚', '✅'],
            emojiSize: 100,
            confettiNumber: 30,
         })
    }
    if (ranges.value == 4){
        console.log('jup')
        output.style.setProperty('--range-clr', "#8EC58E")
    }
    if (ranges.value == 3){
        console.log('jup')
        output.style.setProperty('--range-clr', "#98C098")
    }
    if (ranges.value == 2){
        console.log('jup')
        output.style.setProperty('--range-clr', "#A1BDA1")
    }
    if (ranges.value == 1){
        console.log('jup')
        output.style.setProperty('--range-clr', "#ACB8AC")
    }
    if (ranges.value == 0){
        console.log('jup')
        output.style.setProperty('--range-clr', "#DDDDDD")
    }
    if (ranges.value == -1){
        console.log('jup')
        output.style.setProperty('--range-clr', "#B9ABAB")
    }
    if (ranges.value == -2){
        console.log('jup')
        output.style.setProperty('--range-clr', "#BDA1A1")
    }
    if (ranges.value == -3){
        console.log('jup')
        output.style.setProperty('--range-clr', "#C19897")
    }
    if (ranges.value == -4){
        console.log('jup')
        output.style.setProperty('--range-clr', "#C58E8E")
    }
    if (ranges.value == -5){
        console.log('nope')
        output.style.setProperty('--range-clr', "rgb(187 88 88)")
        jsConfetti.addConfetti({
            emojis: ['☹️', '💔', '❌', '👎'],
            emojiSize: 100,
            confettiNumber: 30,
         })
    }
})




