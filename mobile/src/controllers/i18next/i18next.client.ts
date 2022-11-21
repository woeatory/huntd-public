/* eslint-disable no-underscore-dangle */

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend';
import * as Localization from 'expo-localization';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import { Languages, Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { PlatformOS } from '@/controllers/app/app.interfaces';
import { AsyncStorageBackend } from '@/controllers/i18next/i18next.backends/AsyncStorageBackend';
import { getAsyncStoragePlugin } from '@/controllers/i18next/i18next.backends/AsyncStoragePlugin';

// Android support
if (Platform.OS === PlatformOS.Android) {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof (Intl as any).__disableRegExpRestore === 'function') {
    (Intl as any).__disableRegExpRestore();
  }
}

i18next
  .use(Backend)
  .use(initReactI18next)
  .use(getAsyncStoragePlugin(Localization.locale))
  .init({
    lng: Languages.English,
    fallbackLng: Languages.English,
    ns: Object.values(Namespaces),
    defaultNS: Namespaces.Common,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      backends: [
        AsyncStorageBackend,
        HttpApi,
      ],
      backendOptions: [
        {
          prefix: 'i18next_res_',
          expirationTime: 6 * 60 * 60 * 1000,
        },
        {
          loadPath: `${Config.API_ENDPOINT}/rest/translates?lang={{lng}}&namespace={{ns}}`,
        },
      ],
    },
  });
