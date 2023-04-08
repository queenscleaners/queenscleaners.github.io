const SLIDESHOW_TIMER = 5000; // in millseconds
const SLIDESHOW_MAX = 5; // # of images
const SLIDESHOW_CHANGE_DELAY = 200; // in milliseconds
let slideshow_ind = 0; // starting index
let slideshow_lastChanged = 0; // timestamp last changed
let timeouts = [];

const nextSlide = (dir = 1) => {
  timeouts.push(setTimeout(() => changeImage(dir), SLIDESHOW_TIMER));
};

const changeImage = (dir) => {
  if (dir > 0) {
    slideshow_ind++
  } else {
    slideshow_ind--;
    if (slideshow_ind < 0) {
      slideshow_ind = SLIDESHOW_MAX - 1;
    }
  }
  slideshow_ind %= 5;
  const galleryImage = document.querySelector(".image-gallery-image");
  const galleryText = document.querySelector(".image-gallery-text");
  galleryImage.src = "images/image" + slideshow_ind + ".jpg";
  galleryText.textContent = (slideshow_ind + 1) + " / " + SLIDESHOW_MAX;
  timeouts.forEach((timeout) => {
    clearTimeout(timeout);
  });
  nextSlide();
}

const navigateImage = (dir) => {
  if (slideshow_lastChanged) {
    let currDate = new Date();
    if (currDate.getTime() - slideshow_lastChanged.getTime() < SLIDESHOW_CHANGE_DELAY) {
      return;
    }
  }
  slideshow_lastChanged = new Date();
  changeImage(dir);
}

const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
leftArrow.addEventListener("click", () => navigateImage(-1));
rightArrow.addEventListener("click", () => navigateImage(1));

nextSlide();
