import NextI18Next from 'next-i18next';
import getConfig from 'next/config';
import HttpApi from 'i18next-http-backend';
import { getApiLink } from '@/lib/getApiLink';

export const nexti18next = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: [],
  localeSubpaths: getConfig()?.publicRuntimeConfig?.localeSubpaths ?? {},
  localePath: typeof window === 'undefined' ? 'public/static/locales' : 'static/locales',
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  fallbackLng: 'en',
  appendNamespaceToCIMode: true,
  appendNamespaceToMissingKey: false,
  saveMissing: true,
  backend: {
    loadPath: `${getApiLink('rest')}/translates?lang={{lng}}&namespace={{ns}}`,
    addPath: `${getApiLink('rest')}/translates?lang={{lng}}&namespace={{ns}}`,
  },
  use: [
    HttpApi,
  ],
});

// eslint-disable-next-line prefer-destructuring
export const i18n = nexti18next.i18n;

// eslint-disable-next-line prefer-destructuring
export const Link = nexti18next.Link;

// eslint-disable-next-line prefer-destructuring
export const Router = nexti18next.Router;
