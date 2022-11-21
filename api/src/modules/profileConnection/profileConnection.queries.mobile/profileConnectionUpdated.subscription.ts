import gql from 'graphql-tag';
import { PROFILE_CONNECTION_BASE_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionBase.fragment';
import { PROFILE_CONNECTION_WITH_USERS_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionWithUsers.fragment';
import { PROFILE_CONNECTION_UNREAD_MESSAGES_COUNT_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionUnreadMessagesCount.fragment';
import { PROFILE_CONNECTION_WITH_USERS_META_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionWithUsersMeta.fragment';

export const PROFILE_CONNECTION_UPDATED_SUBSCRIPTION = gql`
  subscription profileConnectionUpdated {
    profileConnectionUpdated {
      ...ProfileConnectionBase
      ...ProfileConnectionWithUsers
      ...ProfileConnectionUnreadMessagesCount
      ...ProfileConnectionWithUsersMeta
    }
  }
  ${PROFILE_CONNECTION_BASE_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_USERS_FRAGMENT}
  ${PROFILE_CONNECTION_UNREAD_MESSAGES_COUNT_FRAGMENT}
  ${PROFILE_CONNECTION_WITH_USERS_META_FRAGMENT}
`;
