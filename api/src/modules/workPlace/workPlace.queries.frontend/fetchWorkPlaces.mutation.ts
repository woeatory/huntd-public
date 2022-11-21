import gql from 'graphql-tag';
import { WORK_PLACE_FULL_FRAGMENT } from '@/modules/workPlace/workPlace.fragments.frontend/workPlaceFull.fragment';

export const FETCH_WORK_PLACES_MUTATION = gql`
  mutation fetchWorkPlaces(
    $linkedinUrl: String!
    $candidateProfileId: Int!
    $liveScrape: Boolean
  ) {
    fetchWorkPlaces(
      linkedinUrl: $linkedinUrl
      candidateProfileId: $candidateProfileId
      liveScrape: $liveScrape
    ) {
      ...WorkPlaceFull
    }
  }
  ${WORK_PLACE_FULL_FRAGMENT}
`;
