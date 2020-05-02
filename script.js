const slideshow_timer = 5000; // in millseconds
const slideshow_max = 5; // # of images
const slideshow_changeDelay = 200; // in milliseconds
var slideshow_ind = 0;
var slideshow_lastChanged = 0;

var backtotop_div = document.getElementById("backtotop-text");
backtotop_div.addEventListener("click", () => {
  $("html").animate({
    scrollTop: 0
  }, 500);
});

var timeouts = [];

var imagegallery_img = document.getElementById("image-gallery-image");
var imagegallery_text = document.getElementById("image-gallery-text");
timeouts.push(setTimeout(() => changeImage(1, true), slideshow_timer));

var leftarrow = document.getElementById("arrow-left");
var rightarrow = document.getElementById("arrow-right");
leftarrow.addEventListener("click", () => navigateImage(-1));
rightarrow.addEventListener("click", () => navigateImage(1));

function changeImage(dir, repeat) {
  if (dir > 0) {
    slideshow_ind++
  } else {
    slideshow_ind--;
    if (slideshow_ind < 0)
      slideshow_ind = slideshow_max - 1;
  }
  slideshow_ind %= 5;
  imagegallery_img.src = "images/image" + slideshow_ind + ".jpg";
  imagegallery_text.textContent = (slideshow_ind + 1) + " / " + slideshow_max;
  // clear timeouts
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  // new timeout
  timeouts.push(setTimeout(() => changeImage(1, true), slideshow_timer));
}

function navigateImage(dir) {
  if (slideshow_lastChanged) {
    let currDate = new Date();
    if (currDate.getTime() - slideshow_lastChanged.getTime() < slideshow_changeDelay) {
      return;
    }
  }
  slideshow_lastChanged = new Date();
  changeImage(dir, false);
}

let currDay = new Date().getDay();
let day = document.getElementById("day" + currDay);
day.classList.add("bold");