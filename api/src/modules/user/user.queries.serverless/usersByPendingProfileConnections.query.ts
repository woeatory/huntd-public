import gql from 'graphql-tag';
import { RECRUITER_PROFILE_BASE_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.serverless/recruiterProfileBase.fragment';

export const USERS_BY_PENDING_CONNECTIONS_QUERY = gql`
  query usersByPendingConnections {
    usersByPendingConnections {
      id
      email
      lastActionTime
      firstName
      lastName
      recruiterProfiles {
        ...RecruiterProfileBase
      }
    }
  }
  ${RECRUITER_PROFILE_BASE_FRAGMENT}
`;
