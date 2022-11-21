import gql from 'graphql-tag';
import { PROFILE_CONNECTION_BASE_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionBase.fragment';

export const REPORT_OFFER_STATUS_MUTATION = gql`
  mutation reportOfferStatus(
    $profileConnectionId: Int!
    $status: OfferStatus!
  ) {
    reportOfferStatus(
      profileConnectionId: $profileConnectionId
      status: $status
    ) {
      ...ProfileConnectionBase
    }
  }
  ${PROFILE_CONNECTION_BASE_FRAGMENT}
`;
