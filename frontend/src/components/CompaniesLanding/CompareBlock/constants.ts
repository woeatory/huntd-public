import { SwiperOptions } from 'swiper';

export enum Competitors {
  Huntd = 'huntd',
  JobBoards = 'job_boards',
  HiringAgencies = 'hiring_agencies',
}

interface Review {
  key: string;
}

export const swiperOptions: SwiperOptions = {
  speed: 300,
  grabCursor: true,
  followFinger: true,
  updateOnWindowResize: true,
  resizeObserver: true,
  pagination: {
    type: 'bullets',
  },
  setWrapperSize: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 8,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
  fadeEffect: {
    crossFade: true,
  },
};

export const REVIEW_LIST: Review[] = [
  {
    key: 'competitor_relevant_candidates',
  },
  {
    key: 'competitor_hire_time',
  },
  {
    key: 'competitor_hire_cost',
  },
  {
    key: 'competitor_posting_fee',
  },
];
