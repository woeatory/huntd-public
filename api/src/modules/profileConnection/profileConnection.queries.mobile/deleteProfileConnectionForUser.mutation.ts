import gql from 'graphql-tag';

export const DELETE_PROFILE_CONNECTION_FOR_USER_MUTATION = gql`
  mutation deleteProfileConnectionForUser($id: Int!) {
    deleteProfileConnectionForUser(id: $id)
  }
`;
