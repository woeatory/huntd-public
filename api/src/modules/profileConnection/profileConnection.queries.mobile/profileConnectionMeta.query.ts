import gql from 'graphql-tag';
import { PROFILE_CONNECTION_BASE_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionBase.fragment';
import { PROFILE_CONNECTION_WITH_USERS_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionWithUsers.fragment';
import { PROFILE_CONNECTION_WITH_PROFILES_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionWithProfiles.fragment';
import { PROFILE_CONNECTION_WITH_USERS_META_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionWithUsersMeta.fragment';
import { PROFILE_CONNECTION_UNREAD_MESSAGES_COUNT_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionUnreadMessagesCount.fragment';

export const PROFILE_CONNECTION_META_QUERY = gql`
  query profileConnectionMeta($profileConnectionId: Int!) {
    profileConnection(id: $profileConnectionId) {
      ...ProfileConnectionBase
      ...ProfileConnectionWithUsers
      ...ProfileConnectionWithProfiles
      ...ProfileConnectionWithUsersMeta
      ...ProfileConnectionUnreadMessagesCount
    }
  }
  ${PROFILE_CONNECTION_BASE_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_USERS_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_PROFILES_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_USERS_META_FRAGMENT}
  ${PROFILE_CONNECTION_UNREAD_MESSAGES_COUNT_FRAGMENT}
`;
