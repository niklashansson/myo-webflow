import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

window.Webflow ||= [];
window.Webflow.push(() => {
  const swipers = document.querySelectorAll(
    '.instructions-swiper_component'
  ) as NodeListOf<HTMLElement>;

  swipers.forEach((swiper: HTMLElement) => {
    const swiperEl = swiper.querySelector('.swiper') as HTMLElement;
    const arrowPrev = swiper.querySelector('.swiper_arrow.is-prev') as HTMLElement;
    const arrowNext = swiper.querySelector('.swiper_arrow.is-next') as HTMLElement;

    if (!arrowPrev || !arrowNext || !swiperEl) return;

    new Swiper(swiperEl, {
      modules: [Navigation],
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
      navigation: {
        enabled: true,
        nextEl: arrowNext,
        prevEl: arrowPrev,
      },
    });
  });
});
