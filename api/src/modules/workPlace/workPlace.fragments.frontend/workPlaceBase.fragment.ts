import gql from 'graphql-tag';

export const WORK_PLACE_BASE_FRAGMENT = gql`
  fragment WorkPlaceBase on CandidateProfileWorkPlace {
    id
    title
    description
    startDate
    endDate
  }
`;
