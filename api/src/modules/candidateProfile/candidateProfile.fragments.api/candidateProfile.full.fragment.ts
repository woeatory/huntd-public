import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileBase.fragment';
import { CANDIDATE_PROFILE_TECHNOLOGIES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileTechnologies.fragment';
import { CANDIDATE_PROFILE_ENGLISH_LEVEL_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileEnglishLevel.fragment';
import { CANDIDATE_PROFILE_JOB_EXPERIENCE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileJobExperience.fragment';
import { CANDIDATE_PROFILE_EMPLOYMENT_TYPES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileEmploymentTypes.fragment';
import { CANDIDATE_PROFILE_SPECIALIZATION_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileSpecialization.fragment';
import { CANDIDATE_PROFILE_USER_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileUser.fragment';
import { CANDIDATE_PROFILE_CITIES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileCities.fragment';
import { CANDIDATE_PROFILE_EMPLOYMENT_LOCATIONS_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileEmploymentLocations.fragment';
import { CANDIDATE_PROFILE_SPECIALIZATIONS_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.api/candidateProfileSpecializations.fragment';

export const CANDIDATE_PROFILE_FULL_FRAGMENT = gql`
  fragment CandidateProfileFull on CandidateProfile {
    ...CandidateProfileBase
    ...CandidateProfileTechnologies
    ...CandidateProfileEnglishLevel
    ...CandidateProfileJobExperience
    ...CandidateProfileEmploymentTypes
    ...CandidateProfileSpecialization
    ...CandidateProfileSpecializations
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
  ${CANDIDATE_PROFILE_SPECIALIZATIONS_FRAGMENT}
  ${CANDIDATE_PROFILE_USER_FRAGMENT}
  ${CANDIDATE_PROFILE_CITIES_FRAGMENT}
  ${CANDIDATE_PROFILE_EMPLOYMENT_LOCATIONS_FRAGMENT}
`;
