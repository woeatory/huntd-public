import gql from 'graphql-tag';

export const UNSUBSCRIBE_FROM_CANDIDATES_SEARCH_MUTATION = gql`
  mutation unsubscribeFromCandidatesSearch($id: Int!, $userId: Int!) {
    unsubscribeFromCandidatesSearch(id: $id, userId: $userId)
  }
`;
