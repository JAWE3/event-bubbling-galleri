// hent html-elementerne ind i variabler til thumbnails
const thumbnails = document.querySelector(".gallery__thumbnails");
const bigImg = document.querySelector(".gallery__bigImg");
const thumbnail = document.querySelectorAll(".gallery__thumbnail");

// hent html-elementerne ind i variabler til lightbox
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeBtn = document.querySelector("#closeBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// konverter NodeList til array og hent src + alt fra alle thumbnails
const images = [...thumbnail].map((img) => img.src);
const alttekster = [...thumbnail].map((imgtxt) => imgtxt.alt);
// console.log(images);

// currentImg skal sættes til 0 (første plads i array/nodelist)
let currentImg = 0;

function showNextImage() {
	let nextIndex = currentImg + 1;
	if (nextIndex >= images.length) {
		nextIndex = 0;
	}
	showImage(nextIndex);
}

function showPrevImage() {
	let prevIndex = currentImg - 1;
	if (prevIndex < 0) {
		prevIndex = images.length - 1;
	}
	showImage(prevIndex);
}

function showImage(index) {
	currentImg = index;
	bigImg.src = images[index];
	bigImg.alt = alttekster[index];
	lightboxImage.src = images[index];
	lightboxImage.alt = alttekster[index];
	thumbnail.forEach((img) =>
		img.classList.remove("gallery__thumbnail--active"),
	);
	thumbnail[index].classList.add("gallery__thumbnail--active");
}

thumbnails.addEventListener("click", function (event) {
	if (event.target.tagName !== "IMG") {
		return;
	}
	currentImg = images.indexOf(event.target.src);
	showImage(currentImg);
});

// LIGHTBOX FUNKTIONER
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
	// luk lightbox ved tryk på closeBtn
	if (event.target.closest("#closeBtn")) {
		lightbox.style.display = "none";
		return;
	}
	// luk lightbox ved tryk inde i lightbox
	if (event.target === lightbox) {
		lightbox.style.display = "none";
	}
});

// TASTATUR FUNKTIONER
document.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		lightbox.style.display = "none";
	}
	// if (lightbox.style.display !== "flex") {
	// 	return;
	// }
	if (event.key === "ArrowLeft") {
		showPrevImage();
	}
	if (event.key === "ArrowRight") {
		showNextImage();
	}
});

// når siden loader, køres function showImage
showImage(currentImg);
