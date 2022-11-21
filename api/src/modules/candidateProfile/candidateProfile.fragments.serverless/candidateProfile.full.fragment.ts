import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.serverless/candidateProfileBase.fragment';
import { CANDIDATE_PROFILE_TECHNOLOGIES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.serverless/candidateProfileTechnologies.fragment';
import { CANDIDATE_PROFILE_ENGLISH_LEVEL_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.serverless/candidateProfileEnglishLevel.fragment';
import { CANDIDATE_PROFILE_JOB_EXPERIENCE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.serverless/candidateProfileJobExperience.fragment';
import { CANDIDATE_PROFILE_EMPLOYMENT_TYPES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.serverless/candidateProfileEmploymentTypes.fragment';
import { CANDIDATE_PROFILE_CITIES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.serverless/candidateProfileCities.fragment';
import { CANDIDATE_PROFILE_WORK_PLACES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.serverless/candidateProfileWorkPlaces.fragment';

export const CANDIDATE_PROFILE_FULL_FRAGMENT = gql`
  fragment CandidateProfileFull on CandidateProfile {
    ...CandidateProfileBase
    ...CandidateProfileTechnologies
    ...CandidateProfileEnglishLevel
    ...CandidateProfileJobExperience
    ...CandidateProfileEmploymentTypes
    ...CandidateProfileSpecializations
    ...CandidateProfileCities
    ...CandidateProfileWorkPlaces
  }
  ${CANDIDATE_PROFILE_BASE_FRAGMENT}
  ${CANDIDATE_PROFILE_TECHNOLOGIES_FRAGMENT}
  ${CANDIDATE_PROFILE_ENGLISH_LEVEL_FRAGMENT}
  ${CANDIDATE_PROFILE_JOB_EXPERIENCE_FRAGMENT}
  ${CANDIDATE_PROFILE_EMPLOYMENT_TYPES_FRAGMENT}
  ${CANDIDATE_PROFILE_CITIES_FRAGMENT}
  ${CANDIDATE_PROFILE_WORK_PLACES_FRAGMENT}
`;
