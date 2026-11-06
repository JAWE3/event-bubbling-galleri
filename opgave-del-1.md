# Opgave: Billedgalleri med Event Bubbling

## Formål

Formålet med denne opgave er at opnå en bedre forståelse af Event Bubbling og få praktisk erfaring med at anvende event-objektet til at håndtere klikbegivenheder.

Du skal udvikle et interaktivt billedgalleri, hvor der kun anvendes én eventlistener til alle miniaturebillederne.

Ved hjælp af `event.target` skal du identificere, hvilket billede der blev klikket på, og derefter opdatere hovedbilledet dynamisk.

---

## Læringsmål

Når du har gennemført opgaven, kan du:

- Forklare hvad Event Bubbling er.
- Forklare hvad et Event-objekt indeholder.
- Bruge `addEventListener()`.
- Bruge `event.target`.
- Manipulere HTML med JavaScript.
- Forstå fordelene ved Event Bubbling.
- Udvikle et interaktivt billedgalleri.

---

## Teori: Hvad er Event Bubbling?

Når en bruger klikker på et HTML-element, registreres eventet først på det element der blev klikket på.

Derefter bevæger eventet sig op gennem DOM-træet.

Eksempel:

```html
<div id="gallery">
    <img src="billede.jpg" alt="Billede">
</div>
```

Klikker brugeren på billedet, vil eventet bevæge sig således:

```text
IMG
 ↑
DIV
 ↑
BODY
 ↑
HTML
```

Denne proces kaldes **Event Bubbling**.

Fordelen er, at vi kan placere én eventlistener på en container i stedet for én eventlistener på hvert enkelt billede.

---

## Projektets opbygning

Projektet skal bestå af tre filer:

```text
projekt/
│
├── index.html
├── style.css
└── script.js
```

Du bestemmer selv om du vil have css og js i mapper for sig selv.

---

## Trin 1: Opret HTML-strukturen

## HTML

Man kan selvfølgelig anvende sine egne billeder i stedet for dem i koden,
hvor der bare linkes til tilfældige billede fra picsum.com

```html
<div class="gallery">
   <div class="gallery__image">
    <img id="bigImg" src="" alt="hund" class="gallery__bigImg" />
   </div>
   <div id="thumbnails" class="gallery__thumbnails">
    <img
     class="gallery__thumbnail gallery__thumbnail--active"
     src="https://picsum.photos/id/237/640/480"
     alt="labrador med hundeøjne" />
    <img
     class="gallery__thumbnail"
     src="https://picsum.photos/id/238/640/480"
     alt="new york city" />
    <img
     class="gallery__thumbnail"
     src="https://picsum.photos/id/239/640/480"
     alt="mælkebøtte" />
    <img
     class="gallery__thumbnail"
     src="https://picsum.photos/id/240/640/480"
     alt="stentrappe med person" />
   </div>
  </div>
```

---

## Sådan fungerer HTML-strukturen

- `largeImage` viser det aktuelle billede.
- `thumbnails` er containeren med miniaturebillederne.
- Hvert thumbnail er et almindeligt `<img>`-element.
- Det første thumbnail har klassen `active`, så det markeres som valgt.

---

## Trin 2: Tilføj CSS

Du kan tilføje dette til et stylesheet, du bruger i forvejen, hvis du implementerer galleriet på en eksisterende side.

Du kan også oprette et nyt stylesheet og linke det i dokumentets `<head>`.
Det forventes at du i forvejen har noget reset.css fx med:

```css
* {
 box-sizing: border-box;
 margin: 0;
 padding: 0;
}

body {
 padding: 2rem;
 font-family: Arial, sans-serif;
 background: #f5f5f5;
}
img {
 width: 100%;
 height: auto;
 max-width: 100%;
 display: block;
}
```

## style.css - eller måske: gallery.css

```css
/* gallery event bubbling thumbnails */
.gallery {
 max-width: 640px;
 margin: 0 auto;
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 grid-template-rows: 2, auto;
 gap: 20px;
}

.gallery__image {
 display: grid;
 grid-template: 1fr / 1fr;
 grid-area: 1/1/2/-1;
}
.gallery__bigImg,
.gallery__thumbnail {
 border-radius: 12px;
}
.gallery__bigImg {
 grid-area: 1 / 1;
}
.gallery__thumbnails {
 display: flex;
 justify-content: space-between;
 gap: 20px;
}
.gallery__thumbnail {
 cursor: pointer;
 border: 3px solid transparent;
 transition: 0.3s;
}
.gallery__thumbnail:hover,
.gallery__thumbnail--active {
 border-color: cadetblue;
 transform: scale(1.02);
}
```

---

## Forklaring af CSS

### `.gallery`

Bestemmer den maksimale bredde på galleriet og centrerer det på siden.

### `.gallery__image`

Anvender CSS Grid til området med det store billede.

### `.gallery__bigImg`

Gør hovedbilledet responsivt og giver det afrundede hjørner.

### `.gallery__thumbnails`

Placerer miniaturebillederne ved siden af hinanden med Flexbox.

### `.gallery__thumbnail--active`

Markerer det aktuelle thumbnail med en lyseblå kant og gør den 3% større.

---

## Trin 3: Opret variabler til HTML-elementerne i JavaScript

JavaScript kan først arbejde med elementerne, når de er fundet i DOM
(Document Object Model)

```javascript
const largeImage = document.querySelector("#largeImage");
const thumbnails = document.querySelector("#thumbnails");
let currentImg = 0;
// lav også denne variabel til index af currentImg, sæt til 0
```

---

## Sådan fungerer Event Bubbling

### `largeImage`

Gemmer en reference til det store billede.

### `thumbnails`

Gemmer en reference til containeren med miniaturebillederne.

Det er bevidst, at vi vælger containeren og ikke hvert enkelt billede.

Det er nemlig grundlaget for Event Bubbling.

---

## Trin 4: Event Bubbling

Nu skal vi oprette én eventlistener på containeren.

```javascript
thumbnails.addEventListener("click", function(event) {

    if (event.target.tagName === "IMG") {
        largeImage.src = event.target.src;
    }
});
```

---

## Forklaring

Når brugeren klikker på et thumbnail:

1. Eventet opstår på billedet.
2. Eventet bobler op til containeren.
3. Eventlisteneren på containeren registrerer klikket.
4. `event.target` fortæller hvilket element der blev klikket på.
5. Hovedbilledet får samme `src` som det klikkede thumbnail.

### Hvad indeholder `event.target`?

```javascript
console.log(event.target);
```

Prøv at åbne browserens Developer Tools og se resultatet i konsollen.

---

## Hvorfor står IMG med store bogstaver?

```javascript
event.target.tagName === "IMG"
```

`tagName` returnerer HTML-elementets navn med STORE bogstaver.

Eksempel:

```javascript
console.log(event.target.tagName);
```

Output:

```text
IMG
```

Hvis du skriver:

```javascript
event.target.tagName === "img"
```

vil betingelsen derfor være falsk.

---

## Trin 5: Markér det aktive billede

Nu skal vi markere det thumbnail der er valgt.

```javascript
thumbnails.addEventListener("click", function(event) {
    if (event.target.tagName === "IMG") {
        document
            .querySelectorAll(".gallery__thumbnail")
            .forEach(img => img.classList.remove("gallery__thumbnail--active"));
        event.target.classList.add("gallery__thumbnail--active");
        largeImage.src = event.target.src;
    }
});
```

---

## Forklaring: Markering af aktivt billede

Når der klikkes på et thumbnail:

Først fjernes klassen `active` fra alle thumbnails.

```javascript
document
    .querySelectorAll(".gallery__thumbnail")
    .forEach(img => img.classList.remove("gallery__thumbnail--active"));
```

Derefter tilføjes klassen til det billede der blev klikket på.

```javascript
event.target.classList.add("gallery__thumbnail--active");
```

Til sidst opdateres hovedbilledet.

```javascript
largeImage.src = event.target.src;
```

---

## Test dit galleri

Kontrollér at:

✅ Der vises ét stort billede.

✅ Der vises mindst fire thumbnails.

✅ Det store billede skifter ved klik.

✅ Det aktive thumbnail markeres.

✅ Der anvendes kun én eventlistener.

✅ Event Bubbling anvendes.

---

## Refleksionsspørgsmål

1. Hvad betyder Event Bubbling?
2. Hvordan fungerer `event.target`?
3. Hvorfor anvendes der kun én eventlistener?
4. Hvilke fordele giver Event Bubbling?
5. Hvad returnerer `tagName`?
6. Hvad er forskellen på `event.target` og `event.currentTarget`?

---

## Afleveringskrav

✅ Minimum 4 billeder

✅ Event Bubbling anvendes

✅ Kun én eventlistener på thumbnails

✅ Hovedbilledet opdateres dynamisk

✅ Aktivt billede markeres
