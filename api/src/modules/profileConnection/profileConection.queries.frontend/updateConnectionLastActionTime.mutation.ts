import gql from 'graphql-tag';

export const UPDATE_CONNECTION_LAST_ACTION_TIME_MUTATION = gql`
  mutation updateConnectionLastActionTime($id: Int!, $time: GraphQLDateTime!) {
    updateConnectionLastActionTime(id: $id, time: $time) {
      id
      userMeta {
        id
        lastActionTime
      }
    }
  }
`;
