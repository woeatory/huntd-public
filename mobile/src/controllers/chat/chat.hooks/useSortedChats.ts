import { useMemo } from 'react';
import { ProfileConnection } from '@/controllers/graphql/generated';

export const useSortedChats = (
  profileConnections: ProfileConnection[],
) => useMemo(() => [...profileConnections].sort(
  (a, b) => {
    const aMessages = Number(a.unreadMessagesCount);
    const bMessages = Number(b.unreadMessagesCount);

    if ((bMessages - aMessages) !== 0) {
      return bMessages - aMessages;
    }

    const aLastActionTime = new Date(a.userMeta?.lastActionTime || 0).getTime();
    const bLastActionTime = new Date(b.userMeta?.lastActionTime || 0).getTime();

    if ((bLastActionTime - aLastActionTime) !== 0) {
      return bLastActionTime - aLastActionTime;
    }

    return 0;
  },
), [profileConnections]);
