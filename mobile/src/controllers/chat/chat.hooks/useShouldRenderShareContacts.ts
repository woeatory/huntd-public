import { useMemo } from 'react';
import {
  ProfileConnection, ProfileConnectionInitiator, ProfileConnectionStatus,
  ProfileConnectionWithProfilesFragment,
  ProfileConnectionWithUsersFragment,
} from '@/controllers/graphql/generated';
import { getChatUserMeta } from '@/controllers/chat/chat.utils/getChatUserMeta';

type ProfileConnectionWithBuddies = (
  ProfileConnectionWithProfilesFragment
  & ProfileConnectionWithUsersFragment
  & ProfileConnection
);

interface UseShouldRenderShareContacts {
  (profileConnection?: ProfileConnectionWithBuddies | null): boolean;
}

export const useShouldRenderShareContacts: UseShouldRenderShareContacts = (
  profileConnection,
) => useMemo(() => {
  if (!profileConnection) {
    return false;
  }

  const { type } = getChatUserMeta(profileConnection);
  const { initiator, status } = profileConnection;

  const candidateType = type === ProfileConnectionInitiator.Candidate;
  const notInitiatorType = type !== initiator;
  const pendingConnection = status === ProfileConnectionStatus.Pending;

  const conditions = [candidateType, notInitiatorType, pendingConnection];

  return conditions.every(Boolean);
}, [profileConnection]);
