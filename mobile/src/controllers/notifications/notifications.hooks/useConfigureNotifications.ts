import { useCallback } from 'react';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  PUSH_NOTIFICATIONS_PERMISSIONS,
  PUSH_NOTIFICATIONS_TOKEN,
} from '@/controllers/notifications/notifications.constants';
import { ClientStorage } from '@/controllers/storage/Storage.client';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { useRegisterDevice } from '@/controllers/notifications/notifications.hooks/useRegisterDevice';
import { useUpdateUserSettings } from '@/controllers/user/user.hooks/useUpdateUserSettings';
import { PushNotificationTypes } from '@/controllers/notifications/notifications.typedefs';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { StackRoutes } from '@/controllers/router/router.constants';

interface UseConfigureNotifications {
  (): [() => void];
}

export const useConfigureNotifications: UseConfigureNotifications = () => {
  const logger = useLogger({ name: 'Configure notifications' });
  const navigation = useNavigation();

  const [registerDevice] = useRegisterDevice();
  const [updateUserSettings] = useUpdateUserSettings();

  const configureNotifications = useCallback(() => {
    PushNotification.configure({
      async onRegister(token) {
        if (await ClientStorage.getItem(PUSH_NOTIFICATIONS_TOKEN)) {
          return;
        }

        const { data } = await registerDevice(token.token);

        if (data?.registerDevice?.token) {
          await ClientStorage.setItem(
            PUSH_NOTIFICATIONS_TOKEN,
            data.registerDevice.token,
          );

          await updateUserSettings({
            pushNotificationsPermission: true,
          });

          logger.info(`Registered device: ${data.registerDevice.userId} ${data.registerDevice.deviceName}`);
        }
      },

      onNotification(notification) {
        switch (notification.data.type) {
          case PushNotificationTypes.ChatMessage: {
            navigation.navigate(
              StackRoutes.Chat,
              { chatId: notification.data.profileConnectionId },
            );
            break;
          }

          default: { /* DO NOTHING */ }
        }

        PushNotification.clearAllNotifications();
        PushNotification.setApplicationIconBadgeNumber(0);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onRegistrationError(error) {
        logger.error(error);
      },

      permissions: PUSH_NOTIFICATIONS_PERMISSIONS,
    });
  }, []);

  return [configureNotifications];
};
