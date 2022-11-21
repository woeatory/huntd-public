import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_TECHNOLOGIES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileTechnologies.fragment';
import { CANDIDATE_PROFILE_ENGLISH_LEVEL_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileEnglishLevel.fragment';
import { CANDIDATE_PROFILE_JOB_EXPERIENCE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileJobExperience.fragment';
import { CANDIDATE_PROFILE_EMPLOYMENT_TYPES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileEmploymentTypes.fragment';
import { CANDIDATE_PROFILE_SPECIALIZATION_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileSpecialization.fragment';
import { CANDIDATE_PROFILE_USER_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileUser.fragment';
import { CANDIDATE_PROFILE_CITIES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileCities.fragment';
import { CANDIDATE_PROFILE_EMPLOYMENT_LOCATIONS_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileEmploymentLocations.fragment';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.mobile/candidateProfileBase.fragment';

export const CANDIDATE_PROFILE_FULL_FRAGMENT = gql`
  fragment CandidateProfileFull on CandidateProfile {
    ...CandidateProfileBase
    ...CandidateProfileTechnologies
    ...CandidateProfileEnglishLevel
    ...CandidateProfileJobExperience
    ...CandidateProfileEmploymentTypes
    ...CandidateProfileSpecialization
    ...CandidateProfileUser
    ...CandidateProfileCities
    ...CandidateProfileEmploymentLocations
  }
  ${CANDIDATE_PROFILE_BASE_FRAGMENT}
  ${CANDIDATE_PROFILE_TECHNOLOGIES_FRAGMENT}
  ${CANDIDATE_PROFILE_ENGLISH_LEVEL_FRAGMENT}
  ${CANDIDATE_PROFILE_JOB_EXPERIENCE_FRAGMENT}
  ${CANDIDATE_PROFILE_EMPLOYMENT_TYPES_FRAGMENT}
  ${CANDIDATE_PROFILE_SPECIALIZATION_FRAGMENT}
  ${CANDIDATE_PROFILE_USER_FRAGMENT}
  ${CANDIDATE_PROFILE_CITIES_FRAGMENT}
  ${CANDIDATE_PROFILE_EMPLOYMENT_LOCATIONS_FRAGMENT}
`;
