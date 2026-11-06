# Del 2: Udvid billedgalleriet med Lightbox

## Formål

I Del 1 udviklede du et billedgalleri ved hjælp af Event Bubbling.

Nu skal galleriet udvides med en Lightbox, så brugeren kan:

- Åbne billederne i stort format.
- Lukke Lightboxen igen.
- Navigere mellem billederne med pileknapper.
- Navigere mellem billederne med tastaturets piletaster.
- Lukke Lightboxen med Escape.

Vi genbruger den eksisterende funktion showImage(), så alle billedskift stadig styres ét sted i koden.

---

## Trin 1: Tilføj HTML til Lightbox

Tilføj følgende HTML lige efter galleriet fra Del 1.

```html
<!-- LIGHTBOX -->
  <div id="lightbox" class="lightbox">
   <div class="lightbox__content">

    <img
     id="lightboxImage"
     class="lightbox__image"
     src=""
     alt="Lightbox billede" />

   <button id="closeBtn" class="lightbox__btnClose">
    <i class="fa-solid fa-xmark"></i>
   </button>
  </div>
```

### Husk Font Awesome

Indsæt følgende i dokumentets head-tag.

```html
<link
 rel="stylesheet"
 href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
```

---

## Trin 2: Tilføj CSS til Lightbox

Tilføj følgende CSS nederst i dit stylesheet.

```css
/* ---------- LIGHTBOX ---------- */

.lightbox {
 display: none;
 position: fixed;
 inset: 0;
 background: rgba(0, 0, 0, 0.9);
 justify-content: center;
 align-items: center;
 z-index: 100;
}

.lightbox__image {
 max-width: 90vw;
 max-height: 90vh;
 border-radius: 0.75rem;
}

.lightbox__btnClose {
 position: absolute;
 top: 1rem;
 right: 1rem;
 border: none;
 background: transparent;
 color: white;
 font-size: 3rem;
 cursor: pointer;
}
```

---

## Trin 3: Skjul thumbnails på tablet og mobil

Når Lightbox senere får pileknapper, bliver thumbnails unødvendige.

Tilføj nederst i dit stylesheet.

```css
@media (max-width: 768px) {
 .gallery__thumbnails {
  display: none;
 }
}
```

---

## Trin 4: Hent Lightbox-elementerne

Tilføj disse variabler til dit script.

```javascript
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeBtn = document.querySelector("#closeBtn");
```

---

## Trin 5: Udvid funktionen showImage()

I Del 1 opdaterede funktionen kun det store billede.

Ret funktionen til denne version:

```javascript
function showImage(index) {

    currentImg = index;

    bigImg.src = images[index];
    lightboxImage.src = images[index];

    thumbnail.forEach((img) =>
        img.classList.remove(
            "gallery__thumbnail--active";
        )
    );

    thumbnail[index].classList.add(
        "gallery__thumbnail--active";
    );

}
```

### Forklaring af showImage()

Nu opdaterer funktionen:

- Hovedbilledet
- Lightbox-billedet
- Aktiv thumbnail
- Variablen currentImg

Alle billedskift foregår stadig gennem samme funktion.

---

## Trin 6: Åbn og luk Lightbox med Event Bubbling

Tilføj følgende kode.

```javascript
document.addEventListener("click", function (event) {
 if (event.target === bigImg) {
  lightbox.style.display = "flex";
  return;
 }

 if (event.target.closest("#closeBtn")) {
  lightbox.style.display = "none";
  return;
 }

 if (event.target === lightbox) {
  lightbox.style.display = "none";
 }
});
```

### Forklaring på lightbox

Vi bruger én samlet click-eventlistener.

Ved hjælp af event.target undersøger vi, hvad brugeren har klikket på.

---

## Udvidelse: Tilføj navigation med pile

Når Lightbox virker, kan vi udvide den med navigation.

---

## Trin 7: Udvid HTML med pileknapper

Erstat Lightbox-koden i HTML med denne version:
(Eller kopier de 2 buttons med prevBtn og nextBtn og sæt ind i html)

```html
<!-- LIGHTBOX -->
<div id="lightbox" class="lightbox">
 <div class="lightbox__content">

  <button id="prevBtn" class="lightbox__prevBtn">
   <i class="fa-solid fa-chevron-left"></i>
  </button>

  <img
   id="lightboxImage"
   class="lightbox__image"
   src=""
   alt="Lightbox billede" />

  <button id="nextBtn" class="lightbox__nextBtn">
   <i class="fa-solid fa-chevron-right"></i>
  </button>

 </div>

 <button id="closeBtn" class="*ightbox__btnClose">
  <i cl*ss="fa-solid*fa-xmark"></i>
 </button>

</div>
```

---

## Trin 8: Tilføj CSS til pileknapperne

Tilføj følgende CSS.

```css
.lightbox__content {
 display: grid;
 grid-template: 1fr / 1fr;
}

.lightbox__prevBtn,
.lightbox__nextBtn {
 grid-area: 1/1;
 width: 3rem;
 height: 3rem;
 border: none;
 border-radius: 5%;
 background: rgba(255, 255, 255, 0.8);
 cursor: pointer;
 z-index: 10;
}
.lightbox__prevBtn {
 justify-self: start;
 align-self: center;
 margin-left: 1rem;
}
.lightbox__nextBtn {
 justify-self: end;
 align-self: center;
 margin-right: 1rem;
}
```

---

## Trin 9: forbind til pileknapperne

Tilføj disse variabler:

```javascript
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
```

---

## Trin 10: Opret funktion til næste billede

```javascript
function showNextImage() {
 let nextIndex = currentImg + 1;
 if (nextIndex >= images.length) {
  nextIndex = 0;
 }
 showImage(nextIndex);
}
```

---

## Trin 11: Opret funktion til forrige billede

```javascript
function showPrevImage() {
 let prevIndex = currentImg - 1;
 if (prevIndex < 0) {
  prevIndex = images.length - 1;
 }
 showImage(prevIndex);
}
```

---

## Trin 12: Tilføj pileknapperne til samme click-event

Udvid click-eventlisteneren.

```javascript
document.addEventListener("click", function (event) {
 // åbn lightbox
 if (event.target === bigImg) {
  lightbox.style.display = "flex";
  return;
 }
 // skift til næste billede
 if (event.target.closest("#nextBtn")) {
  showNextImage();
  return;
 }
 // skift til forrige billede
 if (event.target.closest("#prevBtn")) {
  showPrevImage();
  return;
 }
 // luk lightbox på kryds
 if (event.target.closest("#closeBtn")) {
  lightbox.style.display = "none";
  return;
 }
 // luk lightbox ved klik inde i lightbox
 if (event.target === lightbox) {
  lightbox.style.display = "none";
 }
});
```

### Forklaring på piletaster

Pileknapperne får ikke deres egne click-eventlisteners.

De håndteres af den samme click-eventlistener som resten af Lightboxen.

På den måde anvender vi Event Bubbling konsekvent.

---

## Trin 13: Tilføj tastaturstyring

Tastaturet får sin egen eventlistener.

```javascript
document.addEventListener("keydown", function (event) {
    // luk lightbox med Escape-tast
    if (event.key === "Escape") {
        lightbox.style.display = "none";
    }

    /* if (lightbox.style.display !== "flex") {
         return;
    } */
    // hvis denne er udkommenteret eller slettet,
    // så fungerer piletaster hele tiden

    // skift til forrige billede med piletast-venstre
    if (event.key === "ArrowLeft") {
        showPrevImage();
    }

    // skift til næste billede med piletast-højre
    if (event.key === "ArrowRight") {
        showNextImage();
    }
});
```

### Forklaring tastaturstyring

Når Lightboxen er åben:

- Escape lukker Lightboxen.
- Venstre piletast viser forrige billede.
- Højre piletast viser næste billede.

Begge funktioner benytter showImage() til at opdatere billederne.

---

## Resultat

Når du er færdig:

- Klik på hovedbilledet åbner Lightbox
- Krydset lukker Lightbox
- Klik på baggrunden lukker Lightbox
- Pileknapperne skifter billede
- Venstre og højre piletast virker
- Escape lukker Lightbox
- Thumbnails skjules på tablet og mobil
- Alle billedskift sker gennem showImage()
- Alle klik i Lightbox håndteres af den samme click-eventlistener ved hjælp af Event Bubbling.
