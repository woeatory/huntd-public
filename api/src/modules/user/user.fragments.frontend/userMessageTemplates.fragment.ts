import gql from 'graphql-tag';
import { MESSAGE_TEMPLATE_BASE_FRAGMENT } from '@/modules/userMessagesTemplate/userMessagesTemplate.fragments.frontend/messagesTemplate.fragment';

export const USER_MESSAGE_TEMPLATES_FRAGMENT = gql`
  fragment UserMessageTemplates on User {
    messageTemplates(messageType: $messageType) {
      ...MessageTemplateBase
    }
  }
  ${MESSAGE_TEMPLATE_BASE_FRAGMENT}
`;
