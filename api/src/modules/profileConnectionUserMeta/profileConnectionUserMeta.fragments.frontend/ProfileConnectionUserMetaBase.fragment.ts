import gql from 'graphql-tag';

export const PROFILE_CONNECTION_USER_META_BASE_FRAGMENT = gql`
  fragment ProfileConnectionUserMetaBase on ProfileConnectionUserMeta {
    id
    lastActionTime
    archivedAt
  }
`;
