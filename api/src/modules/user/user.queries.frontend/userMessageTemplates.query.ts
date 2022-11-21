import gql from 'graphql-tag';
import { USER_MESSAGE_TEMPLATES_FRAGMENT } from '@/modules/user/user.fragments.frontend/userMessageTemplates.fragment';

export const USER_MESSAGE_TEMPLATES_QUERY = gql`
  query UserMessageTemplates($messageType: PrimaryProfile!) {
    authUser {
      id
      messageTemplates: messageTemplates(messageType: $messageType) {
        ...MessageTemplateBase
      }
    }
  }
  ${USER_MESSAGE_TEMPLATES_FRAGMENT}
`;
