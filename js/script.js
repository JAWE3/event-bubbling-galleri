const largeImage = document.querySelector("#largeImage");
const thumbnails = document.querySelector("#thumbnails");
const thumbnail = document.querySelectorAll(".gallery__thumbnail");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeBtn = document.querySelector("#closeBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

const images = [...thumbnail].map((img) => img.src);
const alttekster = [...thumbnail].map((imgtxt) => imgtxt.alt);

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
	largeImage.src = images[index];
	largeImage.alt = alttekster[index];
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

document.addEventListener("click", function (event) {
	if (event.target === largeImage) {
		lightbox.style.display = "flex";
		return;
	}

	if (event.target.closest("#nextBtn")) {
		showNextImage();
		return;
	}

	if (event.target.closest("#prevBtn")) {
		showPrevImage();
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

document.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		lightbox.style.display = "none";
	}

	if (event.key === "ArrowLeft") {
		showPrevImage();
	}

	if (event.key === "ArrowRight") {
		showNextImage();
	}
});

showImage(currentImg);
