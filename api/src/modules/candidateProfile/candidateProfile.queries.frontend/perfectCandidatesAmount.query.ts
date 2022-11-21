import gql from 'graphql-tag';

export const PERFECT_CANDIDATES_AMOUNT_QUERY = gql`
  query perfectCandidatesAmount($where: PublicProfilesParameters) {
    perfectCandidatesAmount(where: $where)
  }
`;
