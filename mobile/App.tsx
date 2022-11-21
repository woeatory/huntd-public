import 'intl';
import 'intl/locale-data/jsonp/en';
import codePush from 'react-native-code-push';

import React from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import { compose } from '@/lib/compose';
import { withApolloApp } from '@/controllers/apollo/apollo.hocs/withApolloApp';
import { withAuthProvider } from '@/controllers/auth/auth.hocs/withAuthProvider';
import { withAppStatusProvider } from '@/controllers/app/app.hocs/withAppStatusProvider';

import '@/controllers/i18next/i18next.client';
import { useMobileFonts } from '@/controllers/fonts/fonts.hooks/useMobileFonts';
import { Router } from '@/screens/router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  const { fontsLoaded } = useMobileFonts();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Router />;
};

export default compose(
  withApolloApp,
  withAuthProvider,
  withAppStatusProvider,
  codePush,
)(App);
