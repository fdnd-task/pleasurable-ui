# Bloemenveld Frankendael - Webapp
Het Bloemenveld in Park Frankendael is een bijzondere plek in het park, waar veel groeit en leeft. Toch blijft de waarde van het veld voor veel voorbijgangers verborgen. Wat er groeit, bloeit en leeft, is niet altijd zichtbaar of makkelijk te begrijpen. Terwijl juist dit soort plekken een grote rol spelen in het versterken van stedelijke natuur en het vergroten van het bewustzijn rondom een duurzame leefomgeving. Daarom is er een duidelijke behoefte aan manieren om bewoners van Amsterdam Oost (Watergraafsmeer) op een laagdrempelige manier kennis te laten maken met de natuur dichtbij huis. Een ervaring die verder gaat dan alleen kijken en waarin bezoekers actief kunnen ontdekken, beleven en leren wat er in hun omgeving leeft.

#### Vraag van de opdrachtgever
Ontwerp en ontwikkel een webapp met een interactieve veldverkenner waarbij bezoekers in verschillende zones van de Bloementuin aan de hand van opdrachten planten en bloemen kunnen ontdekken. Bij het goed maken van de opdrachten kunnen badges worden verdiend

Check [hier](https://pleasurable-ui-xr0z.onrender.com/) de website.

**Developers**

- [Gijs](https://github.com/GijsNagtegaal)

- [Lynn](https://github.com/lynnvdbo)

- [Tin](https://github.com/WebTins)

- [Kevin](https://github.com/toasterbath0758)

- [Seb](https://github.com/SebBastiaans)

- [Bronx](https://github.com/bronxpostma13)

## Inhoudsopgave

  * [Beschrijving](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#beschrijving)
  * [Huisstijl](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#huisstijl)
  * [Kenmerken](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#kenmerken)
  * [Installatie](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#installatie)
  * [Bronnen](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#bronnen)
  * [Licentie](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->
Voor de opdrachtgever maken wij een website wat eigenlijk een webapp is. Het is de bedoeling dat de bezoeker een QR code kan scannen en dan vervolgens op de webapp komt. Er is dan een veldverkenner die je laat zien waar je op dat moment bevindt in het bloemenveld en dan kan je zelf op verschillende zones drukken in de app. Vervolgens krijg je een opdracht en informatie over de de debetreffende plant.
 
De afgelopen weken hebben wij als team met zijn allen aan een website gewerkt. We hebben ons ook gefocust op pleasurable ui. Dit staat voor een gebruikersinterface die niet alleen functioneel en makkelijk in gebruik is, maar de gebruiker ook een aangename, plezierige ervaring biedt.

## Huisstijl
Van de opdrachtgever hebben wij een prototype gekregen van het design in een figma bestand Op basis van dat prototype design ben ik mijn website gaan maken. Wij hebben dezelfde kleuren, afbeeldingen, fonts etc gebruikt en toegepast op de website.

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->

### Pagina's

  * [Homepage](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#homepage)
  * [Veldbeheer](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#veldbeheer)
  * [Suggestie](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#suggestie)
  * [Account](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#account)
  * [Veldverkenner](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#veldverkenner)
  * [Nieuws](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#nieuwsartikel)
  * [Nieuwsartikel](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#nieuwsartikel)
  * [Collectie](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#collectie)

## Homepage

## Veldbeheer

Op de veldbheer pagina zie je welke activiteiten er te doen zijn op het bloemenveld en kunnen mensen doneren voor de ontwikkeling van het park. Ook kan je een suggestie achterlaten waar later in deze readme meer over wordt uitgelegd.

De opbouw van de pagina:

Een korte introductie

<img width="331" height="383" alt="Screenshot 2026-05-28 at 09 21 51" src="https://github.com/user-attachments/assets/0280ae8b-65f6-4b8c-8e61-9c423c7ea2c5" />

Een carousel met alle activiteiten per maand

<img width="322" height="403" alt="Screenshot 2026-05-28 at 09 21 58" src="https://github.com/user-attachments/assets/5a03edae-b8ff-4dba-8df9-e5f923a81f89" />

Donatieknop met range slider om te kunnen kiezen hoeveel je wilt doneren

<img width="332" height="246" alt="Screenshot 2026-05-28 at 09 22 02" src="https://github.com/user-attachments/assets/174b606c-83d8-4511-89b5-ce274c6bd3b4" />

### Technische documentatie

**Pleasurable UI**

Een smooth pleasuable animatie voor de carousel:

https://github.com/user-attachments/assets/d5285f3d-9e0f-4604-bebe-2606b4cd153a

**Progressive enhancement**

Firefox ondersteunt de manier van de carousel nog niet, daarvoor heb ik @supports toegevoegd.
Ik check met dit stukje code:

https://github.com/GijsNagtegaal/pleasurable-ui/blob/597d33c556c200398c51ee034a8e5696d7a7ab21/public/assets/styles/style.css#L1420-L1424

Als het niet ondersteund wordt voeg ik een extra gap toe tussen de kaartjes:

https://github.com/GijsNagtegaal/pleasurable-ui/blob/597d33c556c200398c51ee034a8e5696d7a7ab21/public/assets/styles/style.css#L1290-L1309

Verder zijn er nog een paar kleine dingetjes zoals de range slider die 100% met Html werkt en alleen javascript gebruikt om de prijs in de knop aan te passen

## Account

Op de accountpagina kan je als gebruiker makkelijk je profielfoto en de accentkleur aanpassen. Ook zie je hoeveel planten je al hebt verzameld 

De pagina:

<img width="338" height="700" alt="Screenshot 2026-05-28 at 09 41 05" src="https://github.com/user-attachments/assets/a6a49ea8-d08d-47e4-9ca7-f1306fc9267b" />

Functies:

Op deze pagina kan je je profielfoto aanpassen en jouw favoriete kleur instellen als accentkleur van de app, dat kan zo:

https://github.com/user-attachments/assets/47715f4e-f8e6-4771-98ab-dde172923461

**Pleasurable UI**

De popovers hebben een leuke animatie zoals te zien op de schermopname, ook hebben de profielfoto een loading state zodat het niet zomaar verspringt

https://github.com/user-attachments/assets/47715f4e-f8e6-4771-98ab-dde172923461

De animatie wordt zo gemaakt:

https://github.com/GijsNagtegaal/pleasurable-ui/blob/597d33c556c200398c51ee034a8e5696d7a7ab21/public/assets/styles/styleguide.css#L665-L684

## Veldverkenner

De veldverkener, het pronkstuk van de app :) Op de veldverkenner kan je zones aanklikken en de opdrachten doen die daarbij horen. Dat ziet er zo uit:

Veldverkenner:

<img width="343" height="707" alt="Screenshot 2026-05-28 at 10 16 08" src="https://github.com/user-attachments/assets/ae60b366-9c09-4902-865f-6745119b8629" />

Zone opdrachten:

<img width="337" height="570" alt="Screenshot 2026-05-28 at 10 16 17" src="https://github.com/user-attachments/assets/26840253-2486-4ee4-bce5-2e330b860fb0" />

Een opdracht doen:

https://github.com/user-attachments/assets/af49fbf0-e071-433d-a81c-04e956f86b26


## Nieuws

Op de nieuws overzicht pagina zie je een lijst met allemaal nieuws artikelen over het bloemenveld. Wanneer je op zo'n artikel klikt wordt je doorgestuurd naar de pagina van dat specifieke artikel met alle informatie. 
Je kunt boven aan sorteren op 'relevantste', 'nieuwste', 'oudste' en ook specifiek zoeken via een zoekbalk. 
Wanneer je op Google Chrome naar beneden scrollt verdwijnt de sorteer/zoek sectie boven uit beeld en komt er rechtsonder een knop om meteen naar boven te scrollen. Op meeste browsers is deze feature nog niet beschikbaar, dan staan de sorteer/zoek sectie en de knop standaard in beeld als je scrollt. Dit zorgt voor een meer 'pleasurable user interface'. 

https://github.com/user-attachments/assets/00ca072e-11b7-4a6a-9b33-67c089118796

### Technische documentatie

**Pleasurable UI**
'naar boven' button - met `@container news-scroll scroll-state(scrollable:top)` wordt er gekeken of er naar boven gescrollt kan worden. Als dat kan dan wordt de `translate` en `transition` uitgevoerd.

https://github.com/GijsNagtegaal/pleasurable-ui/blob/d56ee21e3833dff5d9602605fc676a64fd8a3d45/public/assets/styles/partials.css#L804-L838

sorteer/zoek sectie - met `@container scroll-state(scrolled:bottom)` wordt er gekeken of er nog naar onder gescrollt kan worden. Als dat kan dan wordt de `translate` uitgevoerd.

https://github.com/GijsNagtegaal/pleasurable-ui/blob/d56ee21e3833dff5d9602605fc676a64fd8a3d45/public/assets/styles/style.css#L659-L661

**Progressive enhancement**

'naar boven' button - Met @supports wordt er gekeken of `container-type: scroll-state;` bestaat op de browser, zo ja wordt het gebruikt, zo nee dan blijft het gewoon `position: fixed;` in beeld zonder animatie.

https://github.com/GijsNagtegaal/pleasurable-ui/blob/d56ee21e3833dff5d9602605fc676a64fd8a3d45/public/assets/styles/partials.css#L807-L822

sorteer/zoek sectie - Wanneer `scroll-state` niet ondersteund wordt, worden die regels CSS overgeslagen en blijft de sectie `fixed` in beeld bij het scrollen.

https://github.com/GijsNagtegaal/pleasurable-ui/blob/d56ee21e3833dff5d9602605fc676a64fd8a3d45/public/assets/styles/style.css#L647-L652

Ook is `backdrop-filter` bassline newly available, dus is er een @supports omheen gezet, zodat wanneer het niet werk er gewoon een `background-color` is.

https://github.com/GijsNagtegaal/pleasurable-ui/blob/9237ac2acdcc5ea1a825085cb4ea4fa3118c1457/public/assets/styles/style.css#L649-L652

Ondersteund een browser deze features niet dan ziet het er zo uit:

https://github.com/user-attachments/assets/7f59f558-25cd-4b6d-9fb1-e7c9484df592

## Nieuwsartikel

Op het artikel pagina zie je de volledige inhoud van een artikel die je eerst op het nieuwsveld ziet. De gebruiker kan het hele artikel gaan lezen over het nieuws in het bloemenveld, en ook kan de gebruiker een opmerking achterlaten om zijn of haar mening te kunnen delen. Op deze manier geeft het nieuwsartikel ook een gevoel dat er een gemeenschap is waar anderen meningen met elkaar kunnen delen.

https://github.com/user-attachments/assets/d4955269-7d0a-45a1-8bdf-3fcf5e654112

### Technische documentatie

**Opmerking plaatsen** (POST). Elke gebruiker kan zijn of haar mening achterlaten door op het formulier de invoervelden te invoeren en versturen.

#### <ins>Feedforward & Feedback POST</ins>

Feedforward versturen van comment:

- Er zijn nog geen opmerkingen (Empty state)

Feedback versturen van comment:

- Loading state komt tevoorschijn met een laad animatie en de tekst "Bezig met plaatsen"
- Success state komt tevoorschijn met de tekst "✔ Geplaatst!"
- Empty state verdwijnt
- Er staat een opmerking met een Naam, bericht en datum

https://github.com/user-attachments/assets/90694d4c-28de-48ca-aa84-c7ae9dc2cafd

#### Pleasurable UI | Loading State

De submit knop krijgt een laad animatie wanneer de opmerking verstuurd wordt. Dit zorgt voor een duidelijk beeld dat de website bezig is met het versturen van de opmerking. De gebruiker kan hierdoor zien wat de huidige staat is van het versturen.

https://github.com/user-attachments/assets/f36b85ea-683e-4fab-966e-114b740794ac

### Progressive Enhancement | Loading state

Sommige gebruikers houden er niet van om animaties te zien. Dus is er een `@media (prefers-reduced-motion: no-preference)` query toegevoegd om animaties te verminderen op de pagina. 

**Before**

https://github.com/user-attachments/assets/26e1dc80-ffcb-45cf-9e0d-0fa05eca4c85


**After**

https://github.com/user-attachments/assets/609890bc-0450-487a-b21d-dfebea41cc31



## Collectie

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->
1. Clone als eerst deze repository
2. Open hem in VSCodium of een code editor
3. Open dan de terminal en type npm install
4. Start vervolgens de website door npm start in te typen
5. Open vervolgens http://localhost:8000 om de website te zien in de browser

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
