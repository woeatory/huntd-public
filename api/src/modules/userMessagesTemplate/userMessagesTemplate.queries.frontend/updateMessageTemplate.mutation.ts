import gql from 'graphql-tag';
import { MESSAGE_TEMPLATE_BASE_FRAGMENT } from '@/modules/userMessagesTemplate/userMessagesTemplate.fragments.frontend/messagesTemplate.fragment';

export const UPDATE_MESSAGE_TEMPLATE_MUTATION = gql`
  mutation updateMessageTemplate(
    $id: Int!,
    $userId: Int,
    $values: UpdateTemplateMessageValues!
  ) {
    updateMessageTemplate(
      id: $id,
      userId: $userId,
      values: $values
    ) {
      ...MessageTemplateBase
    }
  }
  ${MESSAGE_TEMPLATE_BASE_FRAGMENT}
`;
