import { TFunction } from 'i18next';
import moment from 'moment';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';

export const getUserActionTime = (
  lastActionTime: string,
  t: TFunction,
): string => {

  const timeDiff = Date.now() - Date.parse(lastActionTime);
  const timeInMinutes = Math.round(timeDiff / (1000 * 60));

  if (timeInMinutes < 10) {
    return t(`${Namespaces.Profile}:profile_online_status`);
  }

  return moment(lastActionTime).fromNow();
};
