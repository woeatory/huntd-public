import { useCallback } from 'react';
import { useRegisterDeviceMutation } from '@/controllers/graphql/generated';
import { getDeviceInfo } from '@/controllers/notifications/notifications.utils/notification.getDeviceInfo';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

export function useRegisterDevice() {
  const logger = useLogger({ name: 'Register device' });
  const [registerDevice] = useRegisterDeviceMutation();

  const callback = useCallback(async (token: string) => {
    try {
      return registerDevice({
        fetchPolicy: 'no-cache',
        variables: { token, ...getDeviceInfo() },
      });
    } catch (error) {
      logger.error(error.message);

      return {};
    }
  }, [registerDevice]);

  return [callback];
}
