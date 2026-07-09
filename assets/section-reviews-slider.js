const slider = document.querySelector('.reviews-slider__swiper');
const desktop = parseFloat(slider.dataset.desktop);
const tablet = parseFloat(slider.dataset.tablet);
const mobile = parseFloat(slider.dataset.mobile);
const gap = parseInt(slider.dataset.gap, 10);

new Swiper(slider, {
  slidesPerView: mobile,
  spaceBetween: gap,
  breakpoints: {
    768: {
      slidesPerView: tablet,
      spaceBetween: gap
    },
    992: {
      slidesPerView: desktop,
      spaceBetween: gap
    }
  }
});