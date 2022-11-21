import gql from 'graphql-tag';
import { MESSAGE_TEMPLATE_BASE_FRAGMENT } from '@/modules/userMessagesTemplate/userMessagesTemplate.fragments.frontend/messagesTemplate.fragment';

export const CREATE_MESSAGE_TEMPLATE_MUTATION = gql`
  mutation createMessageTemplate(
    $userId: Int!,
    $messageType: PrimaryProfile!,
    $messageTitle: String!
    $messageBody: String!
  ) {
    createMessageTemplate(
      userId: $userId,
      messageType: $messageType,
      messageTitle: $messageTitle
      messageBody: $messageBody
    ) {
      ...MessageTemplateBase
    }
  }
  ${MESSAGE_TEMPLATE_BASE_FRAGMENT}
`;
