import gql from 'graphql-tag';
import { JOB_EXPERIENCE_BASE_FRAGMENT } from '@/modules/jobExperience/jobExperience.fragments.mobile/jobExperienceBase.fragment';

export const CANDIDATE_PROFILE_JOB_EXPERIENCE_FRAGMENT = gql`
  fragment CandidateProfileJobExperience on CandidateProfile {
    jobExperience {
      ...JobExperienceBase
    }
  }
  ${JOB_EXPERIENCE_BASE_FRAGMENT}
`;
