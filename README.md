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
  * [Account](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#account)
  * [Veldverkenner](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#veldverkenner)
  * [Nieuws](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#nieuwsartikel)
  * [Nieuwsartikel](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#nieuwsartikel)
  * [Collectie](https://github.com/GijsNagtegaal/pleasurable-ui/edit/main/README.md#collectie)

## Homepage

## Veldbeheer

## Account

## Veldverkenner

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
