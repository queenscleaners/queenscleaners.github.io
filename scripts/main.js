const splide = new Splide('.splide', {
  type    : 'loop',
  perPage : 1,
  width   : '100%',
  height  : 'auto',
  arrows  : true,
  autoplay: 'pause',
  interval : 5000,
});
splide.mount();
document.querySelector(".splide__toggle__play").click();
