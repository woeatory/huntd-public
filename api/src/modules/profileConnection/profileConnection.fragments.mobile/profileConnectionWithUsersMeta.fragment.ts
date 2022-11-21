import gql from 'graphql-tag';
import { PROFILE_CONNECTION_USER_META_BASE_FRAGMENT } from '@/modules/profileConnectionUserMeta/profileConnectionUserMeta.fragments.mobile/ProfileConnectionUserMetaBase.fragment';

export const PROFILE_CONNECTION_WITH_USERS_META_FRAGMENT = gql`
  fragment ProfileConnectionWithUsersMeta on ProfileConnection {
    userMeta {
      ...ProfileConnectionUserMetaBase
    }
    buddyMeta {
      ...ProfileConnectionUserMetaBase
    }
  }
  ${PROFILE_CONNECTION_USER_META_BASE_FRAGMENT}
`;
