import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { useLogOutMutation } from '@/controllers/graphql/generated';
import { useAuthContext } from '@/controllers/auth/auth.context';
import { AuthStatus } from '@/controllers/auth/auth.typedefs';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { useUnregisterDevice } from '@/controllers/notifications/notifications.hooks/useUnregisterDevice';
import { PUSH_NOTIFICATIONS_TOKEN } from '@/controllers/notifications/notifications.constants';
import { ClientStorage } from '@/controllers/storage/Storage.client';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

export const SignOut: FC = () => {
  const logger = useLogger({ name: 'Sign out' });
  const { t } = useTranslation([Namespaces.Auth]);
  const client = useApolloClient();

  const [logOut, { loading }] = useLogOutMutation();
  const [unregisterDevice] = useUnregisterDevice();
  const { setAuthState } = useAuthContext();

  const handleLogOut = useCallback(async () => {
    try {
      if (Constants.isDevice) {
        const pushToken = await ClientStorage.getItem(PUSH_NOTIFICATIONS_TOKEN);

        if (pushToken) {
          await unregisterDevice(pushToken);
        }
      }

      await logOut();

      await AnalyticsClient.clear();
      await client.resetStore();

      setAuthState({
        authStatus: AuthStatus.LoggedOut,
      });
    } catch (error) {
      logger.error(error);
    }
  }, [
    logOut,
    client,
    setAuthState,
    unregisterDevice,
  ]);

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={loading}
      onPress={handleLogOut}
    >
      <Text style={[styles.text, typography.text]}>
        {t(`${Namespaces.Auth}:sign_out_action`)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  text: {
    color: Colors.Citrus,
  },
});
