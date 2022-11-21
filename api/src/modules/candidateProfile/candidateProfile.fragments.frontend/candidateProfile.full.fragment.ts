import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileBase.fragment';
import { CANDIDATE_PROFILE_TECHNOLOGIES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileTechnologies.fragment';
import { CANDIDATE_PROFILE_ENGLISH_LEVEL_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileEnglishLevel.fragment';
import { CANDIDATE_PROFILE_JOB_EXPERIENCE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileJobExperience.fragment';
import { CANDIDATE_PROFILE_EMPLOYMENT_TYPES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileEmploymentTypes.fragment';
import { CANDIDATE_PROFILE_USER_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileUser.fragment';
import { CANDIDATE_PROFILE_CITIES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileCities.fragment';
import { CANDIDATE_PROFILE_EMPLOYMENT_LOCATIONS_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileEmploymentLocations.fragment';
import { CANDIDATE_PROFILE_SPECIALIZATIONS_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileSpecializations.fragment';
import { CANDIDATE_PROFILE_WORK_PLACES_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileWorkPlaces.fragment';

export const CANDIDATE_PROFILE_FULL_FRAGMENT = gql`
  fragment CandidateProfileFull on CandidateProfile {
    ...CandidateProfileBase
    ...CandidateProfileTechnologies
    ...CandidateProfileEnglishLevel
    ...CandidateProfileJobExperience
    ...CandidateProfileEmploymentTypes
    ...CandidateProfileSpecializations
    ...CandidateProfileUser
    ...CandidateProfileCities
    ...CandidateProfileEmploymentLocations
    ...CandidateProfileWorkPlaces
  }
  ${CANDIDATE_PROFILE_BASE_FRAGMENT}
  ${CANDIDATE_PROFILE_TECHNOLOGIES_FRAGMENT}
  ${CANDIDATE_PROFILE_ENGLISH_LEVEL_FRAGMENT}
  ${CANDIDATE_PROFILE_JOB_EXPERIENCE_FRAGMENT}
  ${CANDIDATE_PROFILE_EMPLOYMENT_TYPES_FRAGMENT}
  ${CANDIDATE_PROFILE_SPECIALIZATIONS_FRAGMENT}
  ${CANDIDATE_PROFILE_USER_FRAGMENT}
  ${CANDIDATE_PROFILE_CITIES_FRAGMENT}
  ${CANDIDATE_PROFILE_EMPLOYMENT_LOCATIONS_FRAGMENT}
  ${CANDIDATE_PROFILE_WORK_PLACES_FRAGMENT}
`;
