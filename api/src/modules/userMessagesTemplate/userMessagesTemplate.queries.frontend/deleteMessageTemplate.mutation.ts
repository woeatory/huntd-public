import gql from 'graphql-tag';

export const DELETE_MESSAGE_TEMPLATE_MUTATION = gql`
  mutation deleteMessageTemplate($id: Int! $userId: Int) {
    deleteMessageTemplate(id: $id, userId: $userId)
  }
`;
