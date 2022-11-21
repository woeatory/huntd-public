import gql from 'graphql-tag';
import { WORK_PLACE_FULL_FRAGMENT } from '@/modules/workPlace/workPlace.fragments.frontend/workPlaceFull.fragment';

export const CANDIDATE_PROFILE_WORK_PLACES_FRAGMENT = gql`
  fragment CandidateProfileWorkPlaces on CandidateProfile {
    workPlaces {
      ...WorkPlaceFull
    }
  }
  ${WORK_PLACE_FULL_FRAGMENT}
`;
