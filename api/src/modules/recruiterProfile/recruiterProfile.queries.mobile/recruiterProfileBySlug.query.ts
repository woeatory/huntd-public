import gql from 'graphql-tag';
import { RECRUITER_PROFILE_FULL_FRAGMENT } from '@/modules/recruiterProfile/recruiterProfile.fragments.mobile/recruiterProfileFull.fragment';

export const RECRUITER_PROFILE_BY_SLUG_QUERY = gql`
  query recruiterProfileBySlug($slug: String!) {
    recruiterProfileBySlug(slug: $slug) {
      ...RecruiterProfileFull
    }
  }
  ${RECRUITER_PROFILE_FULL_FRAGMENT}
`;
