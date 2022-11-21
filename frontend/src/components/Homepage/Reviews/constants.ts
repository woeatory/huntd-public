import { SwiperOptions } from 'swiper';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

interface Review {
  id: number;
  name: string;
  position: string;
  body: string;
  url: string;
  devUrl: string;
}

export const swiperOptions: SwiperOptions = {
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
  slidesPerView: 1,
  roundLengths: true,
  updateOnWindowResize: true,
  spaceBetween: 64,
  loop: true,
  speed: 300,
  grabCursor: true,
  followFinger: true,
  effect: 'flip',
  watchSlidesVisibility: true,
  centeredSlides: true,
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
  },
  fadeEffect: {
    crossFade: true,
  },
};

export const reviews: Review[] = [
  {
    id: 1,
    name: `${Namespaces.Home}:first_review_name`,
    position: `${Namespaces.Home}:first_review_position`,
    body: `${Namespaces.Home}:first_review_text`,
    url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/5_61314a8d2d.webp',
    devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/5_dfe3712bed.webp',
  },
  {
    id: 2,
    name: `${Namespaces.Home}:second_review_name`,
    position: `${Namespaces.Home}:second_review_position`,
    body: `${Namespaces.Home}:second_review_text`,
    url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/1_41294dbdca.webp',
    devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/1_b71760ce58.webp',
  },
  {
    id: 3,
    name: `${Namespaces.Home}:third_review_name`,
    position: `${Namespaces.Home}:third_review_position`,
    body: `${Namespaces.Home}:third_review_text`,
    url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/2_6af5a8f015.webp',
    devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/2_deb83189c5.webp',
  },
  {
    id: 4,
    name: `${Namespaces.Home}:fourth_review_name`,
    position: `${Namespaces.Home}:fourth_review_position`,
    body: `${Namespaces.Home}:fourth_review_text`,
    url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/3_0d8490ddcf.webp',
    devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/3_0d0edd4bb7.webp',
  },
  {
    id: 5,
    name: `${Namespaces.Home}:fifth_review_name`,
    position: `${Namespaces.Home}:fifth_review_position`,
    body: `${Namespaces.Home}:fifth_review_text`,
    url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/4_effbb3a926.webp',
    devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/4_7e4418d02b.webp',
  },
];
