import gql from 'graphql-tag';
import { PROFILE_CONNECTION_BASE_FRAGMENT } from '@/modules/profileConnection/profileConnection.fragments.frontend/profileConnectionBase.fragment';

export const CANDIDATE_PROFILE_CONNECTIONS_FRAGMENT = gql`
  fragment CandidateProfileConnections on CandidateProfile {
    connectionsCount
  }
  ${PROFILE_CONNECTION_BASE_FRAGMENT}
`;
