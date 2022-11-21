import { useCallback } from 'react';
import { useUnregisterDeviceMutation } from '@/controllers/graphql/generated';
import { PUSH_NOTIFICATIONS_TOKEN } from '@/controllers/notifications/notifications.constants';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { ClientStorage } from '@/controllers/storage/Storage.client';

export function useUnregisterDevice() {
  const logger = useLogger({ name: 'Unregister device' });
  const [unregisterDevice] = useUnregisterDeviceMutation();

  const callback = useCallback(async (token: string) => {
    try {
      const unregisterDeviceQuery = await unregisterDevice({
        fetchPolicy: 'no-cache',
        variables: { token },
      });

      await ClientStorage.removeItem(PUSH_NOTIFICATIONS_TOKEN);

      return unregisterDeviceQuery;
    } catch (error) {
      logger.error(error.message);

      return null;
    }
  }, [unregisterDevice]);

  return [callback];
}
