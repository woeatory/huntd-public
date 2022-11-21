import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BackendModule,
  ReadCallback, ResourceLanguage, Services,
} from 'i18next';

const storage = {
  setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  },
  getItem(key: string) {
    return AsyncStorage.getItem(key);
  },
};

const getDefaults = () => ({
  prefix: 'i18next_res_',
  expirationTime: 7 * 24 * 60 * 60 * 1000,
  versions: {},
});

export class AsyncStorageBackend implements BackendModule {
  static type = 'backend';

  readonly type = 'backend';

  services: Services;

  options: Record<string, any>;

  constructor(services: Services, options = getDefaults()) {
    this.services = services;
    this.options = options;
  }

  init(services: Services, options = {}) {
    this.services = services;
    this.options = Object.keys(options).length > 0 ? options : getDefaults();
  }

  read(language: string, namespace: string, callback: ReadCallback) {
    const nowMS = new Date().getTime();

    storage.getItem(
      `${this.options.prefix}${language}-${namespace}`,
    ).then((item) => {
      if (item) {
        const local = JSON.parse(item);

        if (
          local.i18nStamp
          && local.i18nStamp + this.options.expirationTime > nowMS
          && this.options.versions[language] === local.i18nVersion
        ) {
          delete local.i18nVersion;
          delete local.i18nStamp;

          return callback(null, local);
        }
      }

      return callback(null, null);
    });

    return callback(null, null);
  }

  save(language: string, namespace: string, data: ResourceLanguage) {
    const insideData = {
      i18nVersion: null,
      ...data,
      i18nStamp: new Date().getTime(),
    };

    if (this.options.versions[language]) {
      insideData.i18nVersion = this.options.versions[language];
    }

    storage.setItem(
      `${this.options.prefix}${language}-${namespace}`,
      JSON.stringify(data),
    );
  }
}
