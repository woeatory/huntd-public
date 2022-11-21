import gql from 'graphql-tag';
import { CANDIDATE_PROFILE_BASE_FRAGMENT } from '@/modules/candidateProfile/candidateProfile.fragments.frontend/candidateProfileBase.fragment';

export const UPDATE_CANDIDATE_PROFILE_MUTATION = gql`
  mutation updateCandidateProfile(
    $position: String
    $salary: Float
    $candidateDescription: String
    $experienceDescription: String
    $workExpectations: String
    $achievements: String
    $technologiesIds: [Int!]
    $jobExperienceId: Int
    $employmentTypesIds: [Int!]
    $employmentLocationsIds: [Int!]
    $englishLevelId: Int
    $specializationId: Int
    $specializationsIds: [Int!]
    $cities: [CandidateProfileCityInput!]
    $workPlaces: [CandidateProfileWorkPlaceInput!]
  ) {
    updateCandidateProfile(
      position: $position
      salary: $salary
      candidateDescription: $candidateDescription
      experienceDescription: $experienceDescription
      workExpectations: $workExpectations
      achievements: $achievements
      technologiesIds: $technologiesIds
      jobExperienceId: $jobExperienceId
      employmentTypesIds: $employmentTypesIds
      employmentLocationsIds: $employmentLocationsIds
      englishLevelId: $englishLevelId
      specializationId: $specializationId
      specializationsIds: $specializationsIds
      cities: $cities
      workPlaces: $workPlaces
    ) {
      ...CandidateProfileBase
    }
  }
  ${CANDIDATE_PROFILE_BASE_FRAGMENT}
`;
