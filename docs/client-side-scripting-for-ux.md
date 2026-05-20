# Pleasurable User Interface

## Client-Side Scripting for UX
Client-side enhancements gebruiken voor een goede UI.

### Aanpak
Vandaag gaan we de drie prototypes die je de afgelopen dagen hebt gemaakt bekijken met elkaar. Daarna ga je bedenken hoe je jouw prototypes kunt maken, en ze vervolgens uitwerken in verschillende feature branches.

## Prototypes delen en bekijken

<!-- Ook naar elkaars prototype kijken, misschien hiermee beginnen? Daarna in teams verder. -->
<!-- Teams gaan de Figma prototypes bekijken en beoordelen. -->

Deel jouw Figma prototypes in Teams, bekijk alle gedeelde prototypes van anderen en plaats een emoji-reactie bij de twee prototypes die jij het best vindt.

### Bronnen

- [Share files and prototypes @ Figma](https://help.figma.com/hc/en-us/articles/360040531773-Share-files-and-prototypes)

## Oefenen met complexere frontend code

In Sprint 10 heb je met client-side scripting de User Experience al wat verbeterd. We gaan nu oefenen met wat nieuwere technieken, die je misschien wel nodig gaat hebben binnen jouw project. Deze zijn nog niet Baseline Widely available, maar kun je prima als Progressive Enhancement inzetten.

### View Transitions

Om te beginnen, gaan we kijken naar View Transitions. Hier is al een [CSS Challenge met verschillende opdrachten](https://github.com/fdnd-task/css-challenges/blob/main/docs/challenge_view-transitions.md) over geweest, maar dit past ook goed in deze sprint.

Een view transition is een animatie tussen twee verschillende momenten; de oude en de nieuwe. De browser maakt een soort screenshot van het oude moment, en een screenshot van het nieuwe moment, en voert daartussen een transition uit. Als je op de ene pagina een heading hebt die rood is en linksboven staat, en op de andere een blauwe die rechtsonder staat, zorgt de browser dat die netjes in elkaar overlopen. Mits je de browser vertelt dat die twee 'hetzelfde' ding zijn, door ze dezelfde `view-transition-name` in CSS te geven.

Je kunt view transitions op _twee manieren_ gebruiken: 1) voor navigaties tussen verschillende pagina's (routes), en 2) binnen JavaScript. Soms gebruik je de ene manier, soms de andere. En soms gebruik je ze door elkaar, zoals in de pizza demo van net.

Voor navigaties tussen verschillende pagina's heb je minimaal dit nodig, waarmee je de browser vertelt dat je view transitions wilt gebruiken:

```css
@view-transition {
    navigation: auto;
}
```

Browsers die dit niet kennen, zullen het gewoon negeren. Hiermee is dit een goede Progressive Enhancement.

De manier binnen JavaScript moet je zelf aanroepen. Gebruik hierbij altijd _feature detection_, aangezien niet elke browser dit ondersteunt, en het een _optionele_ enhancement is:

```js
if (document.startViewTransition) {
    document.startViewTransition(function() {
        // Verander hier iets
    });
} else {
    // Verander hier iets
}
```

Natuurlijk is het veel complexer dan dit, en kun je hier heel veel mee, maar laten we beginnen met een kleine oefening. Gebruik de bronnen en overleg met elkaar om het werkend te krijgen.

Maak een `view-transitions.html` bestand in je Learning Journal, kopieer deze HTML erheen, en maak de demo werkend door de CSS aan te passen:

```html
TODO
```

#### Bronnen

- [Smooth transitions with the View Transition API](https://developer.chrome.com/docs/web-platform/view-transitions/)
- [Cross-Document View Transitions: The Gotchas Nobody Mentions @ CSS Tricks](https://css-tricks.com/cross-document-view-transitions-part-1/)
- [Using the View Transition API @ MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)
- [Feature detection @ MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Feature_detection)

### Scroll-Driven Animations

Met scroll-driven animations kun je keyframe animaties niet afhankelijk van een _duration_ (tijd) laten zijn, maar van de _viewport_ of de _scrollbar_. Alles wat je al weet van keyframes, kun je dus hergebruiken. Is een bepaald element op jouw pagina bijvoorbeeld voor 50% de viewport binnen gescrolld? Voer de keyframe animatie dan ook voor 50% uit. Of heb je een scrollbar bij een carrousel? Dan kun je keyframe animaties aan die scrollbar koppelen, zodat je met de scrollbar de animatie bestuurt.

Hiermee kun je heel ver gaan om een pleasurable interface te maken, maar laten we beginnen met een kleine oefening. Gebruik weer de bronnen en overleg.

Maak een `scroll-driven-animations.html` bestand in je Learning Journal, kopieer deze HTML erheen, en maak de demo werkend door de CSS aan te passen. Experimenteer vooral met verschillende effecten.

```html
<!doctype html>
<title>Scroll-driven animations</title>
<style>
@keyframes appear {
    0% {
        opacity: 0;
        translate: 0 4em;
    }
    100% {
        opacity: 1;
        translate: 0 0;
    }
}
p {
    font-size: 10vw;
}
span {
    display: inline-block;
    animation: appear;
}
</style>
<p><span>Lorem</span> <span>ipsum</span> <span>dolor</span> <span>sit</span>
<span>amet,</span> <span>consectetur</span> <span>adipisicing</span> <span>elit,</span>
<span>sed</span> <span>do</span> <span>eiusmod</span> <span>tempor</span> <span>incididunt</span>
<span>ut</span> <span>labore</span> <span>et</span> <span>dolore</span> <span>magna</span>
<span>aliqua.</span> <span>Ut</span> <span>enim</span> <span>ad</span> <span>minim</span>
<span>veniam,</span> <span>quis</span> <span>nostrud</span> <span>exercitation</span>
<span>ullamco</span> <span>laboris</span> <span>nisi</span> <span>ut</span> <span>aliquip</span>
<span>ex</span> <span>ea</span> <span>commodo</span> <span>consequat.</span> <span>Duis</span>
<span>aute</span> <span>irure</span> <span>dolor</span> <span>in</span> <span>reprehenderit</span>
<span>in</span> <span>voluptate</span> <span>velit</span> <span>esse</span> <span>cillum</span>
<span>dolore</span> <span>eu</span> <span>fugiat</span> <span>nulla</span> <span>pariatur.</span>
<span>Excepteur</span> <span>sint</span> <span>occaecat</span> <span>cupidatat</span> <span>non</span>
<span>proident,</span> <span>sunt</span> <span>in</span> <span>culpa</span> <span>qui</span>
<span>officia</span> <span>deserunt</span> <span>mollit</span> <span>anim</span> <span>id</span>
<span>est</span> <span>laborum.</span></p>
```

💡 Let op: test goed in browsers dit scroll-driven animations niet ondersteunen, want je wilt dit echt als optionele enhancement inzetten. En bedenk ook hoe dit samenwerkt met `@media (prefers-reduced-motion: no-preference)`

#### Bronnen

- [Scroll-driven Animation demos](https://scroll-driven-animations.style/)
- [Scroll-driven Animations interactief uitgelegd door Josh Comeau](https://www.joshwcomeau.com/animation/scroll-driven-animations/)
- [Scroll-driven Animations @ MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)

### JavaScript

Het [script dat je van ons kreeg](https://github.com/fdnd-task/user-experience-enhanced-website/blob/main/docs/client-side-scripting-for-ux.md#client-side-javascript) in Sprint 10, volgde het [driestappenplan uit Sprint 5](https://github.com/fdnd-task/fix-the-flow-interactive-website/blob/main/docs/programming-user-interaction.md): 1) zoek het `<form>` met `querySelector`, 2) wacht op het `submit` _event_ met `addEventListener` en 3) en doe daarna _iets_. In dit geval misschien een _loading state_ klaarzetten met een `classList.toggle()`, een _client-side_ `fetch()` uitvoeren en de gebruiker _feedback_ geven. Hiermee kun je de UX verbeteren.

Maar je kunt in die laatste stap natuurlijk nog veel meer doen om de UI meer pleasurable te maken. Een geluidje afspelen, de telefoon even laten trillen, [confetti afschieten](https://confettijs.org/), of een view transition starten. De mogelijkheden zijn eindeloos.

Maak een `js-audio.html` bestand in je Learning Journal, kopieer deze HTML erheen, [zoek en download een pleasurable geluidje](https://pixabay.com/sound-effects/), en maak de demo werkend door de JavaScript aan te passen.

```html
<!doctype html>
<title>Audio met JS</title>
<script type="module">
// Laad het geluid in

const button = document.querySelector('btn');

button.addEventListener('click', function() {
    // Speel het geluid af
});
</script>
<button id="btn">Koop die pizza</button>
```

💪 Dit al eens gedaan, en een extra uitdaging nodig? Laat de knop dan ook via een view transition een winkelmandje in gaan.

Je kunt dit daarna misschien in je project ergens gebruiken.

#### Bronnen

- [Programming User Interaction @ Sprint 5](https://github.com/fdnd-task/fix-the-flow-interactive-website/blob/main/docs/programming-user-interaction.md)
- [Client-Side scripting for UX @ Sprint 10](https://github.com/fdnd-task/user-experience-enhanced-website/blob/main/docs/client-side-scripting-for-ux.md)
- [Audio @ MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio)
- [Vibration API @ MDN](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)


## Breakdowns maken van de Prototypes

<!-- Daarna uitdenken hoe ze dit kunnen maken met een breakdown/pseudocode van de wireflow/screenflow < bespreken met docent (hier kunnen we studenten helpen met client-side scripting, hoe pak je dit nou aan in js + css? Over het algemeen 'gewoon' met het 3 stappenplan van js. Dus niet gaan googlen nu of llm-en, maar zelf bedenken) -->

Maak met je team breakdown van de prototypes die jullie hebben gemaakt. Bespreek hoe je de pleasurable UI kan bouwen met client-side scripting of bovenstaande technieken. Je kan een schets maken met aantekeningen, of je kan in het prototype in Figma aantekeningen maken. 

Bedenk in detail hoe je de animaties kunt maken met bijvoorbeeld keyframes in CSS, en wat voor _easings_ je nodig hebt. 

Tip: Gebruik het 3 stappenplan van JavaScript om op basis van een event iets te laten gebeuren. 

Als jullie verschillende breakdowns hebben gemaakt, komt een docent langs om jullie technische plan te bespreken en te helpen. 


## Prototypes uitwerken in feature branches

Maak individueel voor elk van je drie prototypes een nieuwe feature branch aan, waarin je de code voor jouw idee uitwerkt in jullie project.

Gebruik onderstaande bronnen en de bronnen die we je tijdens het rondlopen gegeven hebben om je code uit te werken. Maak eventueel ook kleine Codepen demo's om in een simpelere omgeving te oefenen, maar pas jouw prototype wel toe in de context van het project. Als je bijvoorbeeld een lekkere animatie voor een button of link hebt ontworpen en geprototyped, zorg dan dat dit voor alle vergelijkbare buttons of links werkt. Hier maak je het verschil tussen een op zichzelf staand idee en het grotere plaatje.

Vrijdag gaan we deze drie uitwerkingen in verschillende _pull requests_ klaarzetten en van elkaar reviewen, dus zorg dat je dan drie feature branches klaar hebt staan.

Ga hiernaast door met de leertaak en de issues die openstaan in je team. Blijf je dagelijkse standups in de gaten houden; hou elkaar op de hoogte van voortgang, bespreek waar je mee bezig bent en geef aan waar je vastloopt en extra hulp kunt gebruiken.

### Inspiratie en extra verdieping

- [Building a Magical 3D Button](https://www.joshwcomeau.com/animation/3d-button/)
- [Reanimating the CSS Day Buttons](https://frontendmasters.com/blog/reanimating-the-css-day-buttons/)
- [Recreating the Twitter Heart Animation](https://css-tricks.com/recreating-the-twitter-heart-animation/)
- [Getting Creative with Keyframes @ YouTube](https://www.youtube.com/watch?v=kXh3EMpaLFo) + [Slides](https://amitsh.com/2022/cssday/gettingCreativeWithKeyframes.pdf) + [Demo's @ Codepen](https://codepen.io/collection/ZMKooM)
- [Building Better Interfaces @ YouTube](https://www.youtube.com/watch?v=o0NtjY17v5w)
