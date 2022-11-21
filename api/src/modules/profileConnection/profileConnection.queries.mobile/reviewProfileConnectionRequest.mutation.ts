import gql from 'graphql-tag';
import { PROFILE_CONNECTION_BASE_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.mobile/profileConnectionBase.fragment';

export const REVIEW_PROFILE_CONNECTION_MUTATION = gql`
  mutation reviewProfileConnectionRequest(
    $id: Int!,
    $status: ProfileConnectionStatus!
  ) {
    reviewProfileConnectionRequest(
      id: $id,
      status: $status
    ) {
      ...ProfileConnectionBase
    }
  }
  ${PROFILE_CONNECTION_BASE_FRAGMENT}
`;
