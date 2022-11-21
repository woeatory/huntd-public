import gql from 'graphql-tag';
import { TECHNOLOGY_BASE_FRAGMENT } from '@/modules/technology/technology.fragments.mobile/technologyBase.fragment';

export const CANDIDATE_PROFILE_TECHNOLOGIES_FRAGMENT = gql`
  fragment CandidateProfileTechnologies on CandidateProfile {
    technologies {
      ...TechnologyBase
    }
  }
  ${TECHNOLOGY_BASE_FRAGMENT}
`;
