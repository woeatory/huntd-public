import gql from 'graphql-tag';
import { WORK_PLACE_BASE_FRAGMENT } from '@/modules/workPlace/workPlace.fragments.serverless/workPlaceBase.fragment';

export const CANDIDATE_PROFILE_WORK_PLACES_FRAGMENT = gql`
  fragment CandidateProfileWorkPlaces on CandidateProfile {
    workPlaces {
      ...WorkPlaceBase
    }
  }
  ${WORK_PLACE_BASE_FRAGMENT}
`;
