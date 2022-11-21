import gql from 'graphql-tag';
import { PROFILE_CONNECTION_BASE_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionBase.fragment';

export const SEND_PROFILE_CONNECTION_REQUEST = gql`
  mutation sendProfileConnectionRequest(
    $candidateProfileId: Int!
    $recruiterProfileId: Int!
  ) {
    sendProfileConnectionRequest(
      candidateProfileId: $candidateProfileId,
      recruiterProfileId: $recruiterProfileId
    ) {
      ...ProfileConnectionBase
    }
  }
  ${PROFILE_CONNECTION_BASE_FRAGMENT}
`;
