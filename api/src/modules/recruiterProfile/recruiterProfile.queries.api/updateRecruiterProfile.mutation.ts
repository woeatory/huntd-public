import gql from 'graphql-tag';
import { RECRUITER_PROFILE_BASE_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.api/recruiterProfileBase.fragment';

export const UPDATE_RECRUITER_PROFILE_MUTATION = gql`
  mutation updateRecruiterProfile(
    $position: String
    $companyName: String
  ) {
    updateRecruiterProfile(
      position: $position
      companyName: $companyName
    ) {
      ...RecruiterProfileBase
    }
  }
  ${RECRUITER_PROFILE_BASE_FRAGMENT}
`;
