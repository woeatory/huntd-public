import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

interface Vacancy {
  id: number,
  logoUrl: string,
  logoDevUrl: string,
  companyTitle: string,
  jobTitle: string,
  salary: string,
  location: string,
}

export const CUTTED_GLOBE_PHOTO = {
  url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/cutted_globe_image_1_6ff592b42d.webp',
  devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/cutted_globe_image_1_8de4dd9ac2.webp',
};

export const HOMEPAGE_VACANCIES: Vacancy[] = [
  {
    id: 1,
    logoUrl: 'https://huntd-files.s3.eu-central-1.amazonaws.com/7776771_19fbd55134eab1c3ae2f727c9170cdf3_medium_jpg_31ea749882.webp',
    logoDevUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/7776771_19fbd55134eab1c3ae2f727c9170cdf3_medium_jpg_92c8aa8151.webp',
    companyTitle: `${Namespaces.Home}:frontend_new_hero_company_name`,
    jobTitle: `${Namespaces.Home}:frontend_new_hero_vacancy_title`,
    salary: `${Namespaces.Home}:frontend_new_hero_vacancy_salary`,
    location: `${Namespaces.Home}:new_hero_vacancy_location`,
  },
  {
    id: 2,
    logoUrl: 'https://huntd-files.s3.eu-central-1.amazonaws.com/1052482_ef2af192c67d533ebfe675c0ceae2add_medium_jpg_078c538492_1_f2b02ef643.webp',
    logoDevUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/1052482_ef2af192c67d533ebfe675c0ceae2add_medium_jpg_078c538492_1_1fa78056c4.webp',
    companyTitle: `${Namespaces.Home}:mobile_new_hero_company_name`,
    jobTitle: `${Namespaces.Home}:mobile_new_hero_vacancy_title`,
    salary: `${Namespaces.Home}:mobile_new_hero_vacancy_salary`,
    location: `${Namespaces.Home}:new_hero_vacancy_location`,
  },
  {
    id: 3,
    logoUrl: 'https://huntd-files.s3.eu-central-1.amazonaws.com/5301087_d45c9efefe89eee0938f41ee0aadb0ab_medium_jpg_96eb7ca5b8.webp',
    logoDevUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/5301087_d45c9efefe89eee0938f41ee0aadb0ab_medium_jpg_96eb7ca5b8_54f4f2a2b0.webp',
    companyTitle: `${Namespaces.Home}:backend_new_hero_company_name`,
    jobTitle: `${Namespaces.Home}:backend_new_hero_vacancy_title`,
    salary: `${Namespaces.Home}:backend_new_hero_vacancy_salary`,
    location: `${Namespaces.Home}:new_hero_vacancy_location`,
  },
  {
    id: 4,
    logoUrl: 'https://huntd-files.s3.eu-central-1.amazonaws.com/7671003_5aba83224cd52a68d882c5b6a7bebead_medium_jpg_47ab0b10e1.webp',
    logoDevUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/7671003_5aba83224cd52a68d882c5b6a7bebead_medium_jpg_47ab0b10e1_acc26c965f.webp',
    companyTitle: `${Namespaces.Home}:fullstack_new_hero_company_name`,
    jobTitle: `${Namespaces.Home}:fullstack_new_hero_vacancy_title`,
    salary: `${Namespaces.Home}:fullstack_new_hero_vacancy_salary`,
    location: `${Namespaces.Home}:new_hero_vacancy_location`,
  },
];
