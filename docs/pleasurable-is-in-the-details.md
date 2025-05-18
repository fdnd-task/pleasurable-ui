# Pleasurable User Interface

## Pleasurable is in the details
Over het ontwerpen en bouwen van de pleasurable laag van interactie.

### Aanpak

Vandaag ga je met je team convergeren - divergeren op het design en de uitwerking van je website. Eerst ga je leren wat pleasurabel ui is aan de hand van de _Hierarchy of User Needs_ piramide.


## Hierarchy of User Needs
In de piramide van User Needs van Aaron Walters is goed te zien dat een _pleasurable interface_, een interface waar een gebruiker plezier aan beleeft, is gebouwd op een stevig fundament. Dit bereik je door een website te ontwerpen en bouwen volgens het principe van Progressive Enhancement.

<!--

https://lawsofux.com/

Voorbeeld button die wil dat je erop klikt
focus animatie op item in een reeks (spotify)
veel te hip prototype voorbeeld micro interactie


Stap voor stap door de driehoek:
https://www.nngroup.com/articles/theory-user-delight/
Analyse laten doen op de 4 lagen van een pattern
- Voorbeelden van patterns die wel/niet pleasurable of basic laag hebben.
- Usability uitleggen
- Animatie principes van Disney (en perceived performance bron?)
- Hoe JS hierin verwerken?
- Clientside

- Prototyping in figma, verschillende versies: Duup end adjust. Animeren in Figma. 
-->

<img src="aarron-walter-user-needs.png" alt="piramide van user needs" width="400"> 

*De hierarchy of user needs van Aaron Walters (hij is hoofd UX designer van MailChimp en schrijver van het boek "Designing for Emotion")*


### Functional & Reliable
De _functional_ en _reliable_ laag van een website komen overeen met de de eerste twee lagen van Progressive Enhancement,

1. Bepaal eerst de core functionality van wat je gaat maken
2. Bouw die functionaliteit met de simpelste techniek (meestal HTML, met een klein beetje Mobile First CSS voor de huisstijl)

Als je je website server-side bouwt, met behulp van goede HTML, formulieren en basic CSS zorg je ervoor dat je website het altijd doet, voor iedereen. Het is misschien niet super fancy, en met weinig details, maar de website doet het altijd, in elke browsers en in principe kunnen alle mensen de website gebruiken.

### Usable
In de *Usable* laag zorg je ervoor dat je website goed te gebruiken is. Dit doe je bijvoorbeeld met een duidelijk visuele hiërarchie, door Gestalt principes toe te passen, en door het ontwerpen van goede feedback en feedforward.

#### Visuele hiërarchie
Door een duidelijke Visuele hiërarchie toe te passen snappen gebruikers waar ze moeten kijken en welke dingen op het scherm het belangrijkst zijn.

Hierover heb je ook geleerd in de workshop [Visuele Hiërarchie uit sprint 1](https://github.com/fdnd-task/your-tribe-squad-page/blob/main/docs/visuele-hierarchie.md)

Joshua Porter schrijft hierover in zijn artikel _Principles of User Interface Design_:
>A strong visual hierarchy is achieved when there is a clear viewing order to the visual elements on a screen. That is, when users view the same items in the same order every time. Weak visual hierarchies give little clue about where to rest one's gaze and end up feeling cluttered and confusing. In environments of great change it is hard to maintain a strong visual hierarchy because visual weight is relative: when everything is bold, nothing is bold. Should a single visually heavy element be added to a screen, the designer may need to reset the visual weight of all elements to once again achieve a strong hierarchy. Most people don't notice visual hierarchy but it is one of the easiest ways to strengthen (or weaken) a design. - [#11 Strong visual hierarchies work best](http://bokardo.com/principles-of-user-interface-design/)

#### Gestalt principes 
Door in je ontwerp rekening te houden met Gestalt principes zorg je ervoor dat informatie duidelijk gegroepeerd is en de gebruiker de pagina goed begrijpt.

Hierover heb je geleerd in de workshop [Layout en compositie uit sprint 4](https://github.com/fdnd-task/look-and-feel-corporate-identity/blob/main/docs/layout-en-compositie.md)

#### Feedback en feedforward
Door goede feedback en feedforward te tonen, en door duidelijke labels te gebruiken voor formulierelementen en menu-items zorg je ervoor dat gebruikers goed snappen hoe een site werkt.

Hier heb je o.a. over geleerd in de workshop [User interface design uit sprint 5](https://github.com/fdnd-task/look-and-feel-corporate-identity/blob/main/docs/layout-en-compositie.md)

Ook met client-side enhancements voor het posten en laden van data kan je ervoor zorgen dat gebruikers duidelijke feedback krijgen.

Joshua Porter schrijft hierover in zijn artikel _Principles of User Interface Design_:
>Humans are most comfortable when they feel in control of themselves and their environment. Thoughtless software takes away that comfort by forcing people into unplanned interactions, confusing pathways, and surprising outcomes. Keep users in control by regularly surfacing system status, by describing causation (if you do this that will happen) and by giving insight into what to expect at every turn. Don't worry about stating the obvious…the obvious almost never is. - [#04 Keep users in control](http://bokardo.com/principles-of-user-interface-design/)

### Pleasurable
De pleasurable laag van de _hierarchy of user needs_ zorgt ervoor dat een gebruiker plezier beleeft aan de website.

<!--
Animations
Tactile transitions or gestural commands
Microcopy (i.e. injecting humor & slang, predicting users’ questions in advance)
Beautiful, relevant high-resolution imagery
Sound interactions
-->

De pleasurable laag leuk om te ontwerpen en bouwen, met animaties en leuke of grappige feedback, het is ook voor je opdrachtgever van belang. Als een interface echt leuk is zullen mensen de website sneller aanbevelen bij anderen. Therese Fessenden van Nielson Norman Group schrijft hierover:
> Users who experience a state of deep delight will be more likely to recommend the product or service to a friend, and to become a passionate return user.

Alleen een pleasurable interface zonder _functional_, _reliable_, en _usable_ laag werkt juist averechts. Een mooie website die niet goed werkt is ... aaaargh ... grrrr ... laat maar ....
Het is zelfs zo dat gebruikers een website die niet goed te gebruiken is beter heinneren dan een goede website. Dit heet _negativity bias_, de neiging van mensen om meer aandacht te besteden aan een negatieve ervaring.

Voorbeelden van een pleasurable interface zijn:

#### Blije button

<video controls src="pleasurable-button.mp4" title=""></video>

Deze button wil heel graag geklikt worden. Het komt een beetje naar de cursor toe en blijft de cursor volgen.

#### Funky focus state

<video controls src="pleasurable-focus-state.mp4" title=""></video>

De hover state over de elementen geeft mooie feedback met animaties, de visuele elementen komen in de vervolgpagina terug. 

#### Slicke Slideshow

<video controls src="pleasurable-slideshow.mov" title=""></video>

De slideshow op de Spotify.design maakt gebruik van verschillende slicke animaties. De slideshow speelt automatisch, je kan het met de knoppen bedienen en met pijltjes, en je kan de items slepen. Aan het eind van de slideshow komen de items weer in beeld. Wat zie je nog meer?

👉 Opdracht alle animaties en enhancements van de slideshow anlyseren en opschrijven? https://spotify.design


## Pleasurable UI ontwerpen en maken


### Pleasurable - button states
:hover :active states animeren in Figma

In de huisstijl

Team maakt verschillende versies mbv de disney animtie principes



### Pleasurable - micro interactie
carousel, scroll, open/close element zoals menu
animeren in Figma

in de huisstijl

Team maakt verschillende versies



### Pleasurable - Client side enhancement
POST functionaliteit

Design pattern uitwerken in Figma
met interactie en animatie

Breakdown maken en bespreken hoe je dit met client-side js kan maken
(Verwijs naar 3 stappenplan in fix the flow)

