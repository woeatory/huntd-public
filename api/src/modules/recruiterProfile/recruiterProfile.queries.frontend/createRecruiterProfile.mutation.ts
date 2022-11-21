import gql from 'graphql-tag';
import { RECRUITER_PROFILE_BASE_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.frontend/recruiterProfileBase.fragment';

export const CREATE_RECRUITER_PROFILE_MUTATION = gql`
  mutation createRecruiterProfile(
    $userId: Int!
    $position: String!
    $companyName: String!
  ) {
    createRecruiterProfile(
      userId: $userId
      position: $position
      companyName: $companyName
    ) {
      ...RecruiterProfileBase
    }
  }
  ${RECRUITER_PROFILE_BASE_FRAGMENT}
`;
