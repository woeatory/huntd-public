import {
  ChatMessageBaseFragment, MessageUserRole,
} from '@/controllers/graphql/generated';

export const getMessageUserRole = (message: ChatMessageBaseFragment) => {
  let authUserRole = MessageUserRole.NotDefined;

  if (message.senderUser?.isAuthUser) {
    authUserRole = MessageUserRole.Sender;
  }

  if (message.recipientUser?.isAuthUser) {
    authUserRole = MessageUserRole.Recipient;
  }

  if (message.isSystemMessage) {
    authUserRole = MessageUserRole.NotDefined;
  }

  return authUserRole;
};
