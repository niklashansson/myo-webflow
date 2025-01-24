import type { CMSList } from 'src/types/CMSList';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

window.Webflow ||= [];

window.Webflow.push(() => {
  window.fsAttributes.push([
    'cmsstatic',
    async (listInstances: CMSList[]) => {
      listInstances.forEach((instance) => {
        const instanceEl = instance.wrapper.closest('.swiper-instance.instruction-gallery');
        if (!instanceEl) return;

        const swiperEl = instanceEl.querySelector('.swiper') as unknown as HTMLElement | undefined;
        if (!swiperEl) return;

        const paginationNext = instanceEl.querySelector('.swiper-next') as HTMLElement | undefined;
        const paginationPrev = instanceEl.querySelector('.swiper-prev') as HTMLElement | undefined;
        if (!paginationNext || !paginationPrev) return;

        new Swiper(swiperEl, {
          slidesPerView: 1.125,
          spaceBetween: 24,
          modules: [Navigation],
          navigation: {
            nextEl: paginationNext,
            prevEl: paginationPrev,
          },
        });
      });
    },
  ]);
});
