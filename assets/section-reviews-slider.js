const slider = document.querySelector('.reviews-slider__swiper');
const desktop = parseFloat(slider.dataset.desktop);
const tablet = parseFloat(slider.dataset.tablet);
const mobile = parseFloat(slider.dataset.mobile);
const gap = parseInt(slider.dataset.gap, 10);

new Swiper(slider, {
  slidesPerView: mobile,
  spaceBetween: gap,
  centeredSlides: false,
  spaceBetween: 12,
  loop: true,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  breakpoints: {
    768: {
      slidesPerView: tablet,
      spaceBetween: gap
    },
    992: {
      slidesPerView: 3.2,
      loop: true,
      spaceBetween: gap,
    }
  }
});