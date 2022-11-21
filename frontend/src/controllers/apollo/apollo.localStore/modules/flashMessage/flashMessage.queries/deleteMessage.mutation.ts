import { gql } from '@apollo/client';

export const DELETE_MESSAGE_MUTATION = gql`
  mutation deleteMessage($id: Int!) {
    deleteMessage(id: $id) @client
  }
`;
