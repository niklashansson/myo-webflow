import Swiper from 'swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  const swipers = document.querySelectorAll('.swiper') as NodeListOf<HTMLElement>;

  swipers.forEach((swiper: HTMLElement) => {
    new Swiper(swiper, {
      // Default parameters
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 24,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 240px
        240: {
          slidesPerView: 1.25,
          spaceBetween: 16,
        },
        // when window width is >= 478px
        478: {
          slidesPerView: 2.25,
          spaceBetween: 20,
        },
        // when window width is >= 767px
        767: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  });
});
