import { nexti18next } from '@/controllers/i18n/i18n.client';

export const allLanguages = [
  nexti18next.config.defaultLanguage,
  ...nexti18next.config.otherLanguages,
];
