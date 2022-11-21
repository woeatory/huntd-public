import gql from 'graphql-tag';
import { USER_BASE_FRAGMENT } from '@/modules/user/user.fragments.frontend/userBase.fragment';
import { PROFILE_CONNECTION_WITH_USERS_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionWithUsers.fragment';
import { PROFILE_CONNECTION_BASE_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionBase.fragment';
import { PROFILE_CONNECTION_WITH_PROFILES_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionWithProfiles.fragment';
import { PROFILE_CONNECTION_UNREAD_MESSAGES_COUNT_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionUnreadMessagesCount.fragment';
import { PROFILE_CONNECTION_WITH_USERS_META_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionWithUsersMeta.fragment';

export const AUTH_USER_CONNECTIONS_QUERY = gql`
  query authUserConnections($archived: Boolean) {
    authUser {
      ...UserBase
      profileConnections(archived: $archived) {
        ...ProfileConnectionBase
        ...ProfileConnectionWithUsers
        ...ProfileConnectionWithProfiles
        ...ProfileConnectionUnreadMessagesCount
        ...ProfileConnectionWithUsersMeta
      }
    }
  }
  ${USER_BASE_FRAGMENT}
  ${PROFILE_CONNECTION_BASE_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_USERS_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_PROFILES_FRAGMENT}
  ${PROFILE_CONNECTION_UNREAD_MESSAGES_COUNT_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_USERS_META_FRAGMENT}
`;
