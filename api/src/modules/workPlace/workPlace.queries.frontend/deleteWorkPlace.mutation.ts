import gql from 'graphql-tag';

export const DELETE_WORK_PLACE_MUTATION = gql`
  mutation deleteWorkPlace($id: Int!) {
    deleteWorkPlace(id: $id)
  }
`;
