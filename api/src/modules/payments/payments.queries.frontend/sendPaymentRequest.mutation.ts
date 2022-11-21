import gql from 'graphql-tag';
import { PROFILE_CONNECTION_BASE_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionBase.fragment';

export const SEND_PAYMENT_REQUEST_MUTATION = gql`
  mutation sendPaymentRequest(
    $profileConnectionId: Int!
    $paymentAmount: Int!
    $candidateSlug: String!
  ) {
    sendPaymentRequest(
      profileConnectionId: $profileConnectionId
      paymentAmount: $paymentAmount
      candidateSlug: $candidateSlug
    ) {
      ...ProfileConnectionBase
    }
  }
  ${PROFILE_CONNECTION_BASE_FRAGMENT}
`;
