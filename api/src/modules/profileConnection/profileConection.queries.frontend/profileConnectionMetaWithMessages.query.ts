import gql from 'graphql-tag';
import { PROFILE_CONNECTION_BASE_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionBase.fragment';
import { PROFILE_CONNECTION_WITH_USERS_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionWithUsers.fragment';
import { PROFILE_CONNECTION_WITH_PROFILES_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionWithProfiles.fragment';
import { PROFILE_CONNECTION_WITH_USERS_META_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionWithUsersMeta.fragment';
import { PROFILE_CONNECTION_UNREAD_MESSAGES_COUNT_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionUnreadMessagesCount.fragment';
import { PROFILE_CONNECTION_MESSAGES_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionMessages.fragment';

export const PROFILE_CONNECTION_META_WITH_MESSAGES_QUERY = gql`
  query profileConnectionMetaWithMessages($profileConnectionId: Int!) {
    profileConnection(id: $profileConnectionId) {
      ...ProfileConnectionBase
      ...ProfileConnectionWithUsers
      ...ProfileConnectionWithProfiles
      ...ProfileConnectionWithUsersMeta
      ...ProfileConnectionUnreadMessagesCount
      ...ProfileConnectionMessages
    }
  }
  ${PROFILE_CONNECTION_BASE_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_USERS_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_PROFILES_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_USERS_META_FRAGMENT}
  ${PROFILE_CONNECTION_UNREAD_MESSAGES_COUNT_FRAGMENT}
  ${PROFILE_CONNECTION_MESSAGES_FRAGMENT}
`;
