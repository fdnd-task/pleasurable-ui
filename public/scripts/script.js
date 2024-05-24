const fiveStarWrapper = document.querySelector("fieldset:nth-of-type(4) label:nth-of-type(5)");
const fiveStarRadio = fiveStarWrapper.querySelector("input");
const popAudio = document.querySelector("audio");

const yathzeeMetDeZessen = () => {
	popAudio.play();
	
	// create 1000 dots
	for (let i = 0; i < 1000; i++) {
		let dot = document.createElement("div");
		fiveStarWrapper.appendChild(dot);

		gsap
			.timeline()
			.set(dot, {
				scale: "random(.5, 1)",	
				backgroundColor: "random([lime,white,deeppink,white,dodgerblue])",	
			})
			.to(dot, {
				duration: 2,
				delay: "random(0, .3)",
				rotate:"random(-2160,2160)",
				physics2D: {
					velocity: "random(200, 600)",
					angle: "random(250, 290)",
					gravity: 600,
				},
				scale: "random(1, 2)",	
				onComplete: removeDot,
				onCompleteParams:[dot],
			})
			.to(dot, {
				duration: 1,
				opacity:0,
			},"<+=1");
	}	
}

removeDot = dot => {
	// remove the dot when done
	dot.remove();
}

fiveStarRadio.onchange = yathzeeMetDeZessen;