/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageDetectorAsyncModule, Services } from 'i18next';

const storage = {
  setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  },
  getItem(key: string) {
    return AsyncStorage.getItem(key);
  },
};

export const getAsyncStoragePlugin = (fallbackLanguage: string) => (
  class AsyncStoragePlugin implements LanguageDetectorAsyncModule {
    static type = 'languageDetector';

    readonly type = 'languageDetector';

    readonly async = true;

    services: Services;

    options: Record<string, any>;

    constructor(services: Services, options = {}) {
      this.services = services;
      this.options = options;
    }

    init(services: Services, options = {}) {
      this.services = services;
      this.options = options;
    }

    async detect(callback: (lang: string) => void) {
      try {
        const language = await storage.getItem(
          '@i18next-async-storage/user-language',
        );

        if (!language) {
          return callback(fallbackLanguage);
        }

        return callback(language);

      } catch (error) {
        return callback(fallbackLanguage);
      }
    }

    async cacheUserLanguage(language: string) {
      try {
        await storage.setItem(
          '@i18next-async-storage/user-language',
          language,
        );
      } catch (error) {
        /* DO NOTHING */
      }
    }
  }
);
