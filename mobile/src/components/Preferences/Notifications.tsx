import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useHeaderHeight } from '@react-navigation/stack';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { PreferencesItem } from '@/components/Preferences/components/PreferencesItem';
import { useUserSettings } from '@/controllers/user/user.hooks/useUserSettings';
import { useUpdateUserSettings } from '@/controllers/user/user.hooks/useUpdateUserSettings';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

export const Notifications: FC = () => {
  const logger = useLogger({ name: 'Notifications settings' });

  const { t } = useTranslation([Namespaces.Common]);
  const headerHeight = useHeaderHeight();

  const [userSettings] = useUserSettings();
  const [updateUserSettings] = useUpdateUserSettings();

  const handleNotifications = useCallback(async () => {
    if (!userSettings) {
      return;
    }

    try {
      const { pushNotificationsPermission } = userSettings;

      await updateUserSettings({
        pushNotificationsPermission: !pushNotificationsPermission,
      });
    } catch (error) {
      logger.error(error);
    }
  }, [updateUserSettings, userSettings]);

  return userSettings && (
    <View style={[styles.container, { paddingTop: headerHeight + 16 }]}>
      <View style={styles.items}>
        <PreferencesItem
          text={t(`${Namespaces.Preferences}:chat_notifications`)}
          isEnabled={userSettings.pushNotificationsPermission}
          onPress={handleNotifications}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  items: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(209, 204, 201, 0.4)',
  },
});
