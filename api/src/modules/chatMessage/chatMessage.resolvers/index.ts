import { sendMessageResolver } from '@/modules/chatMessage/chatMessage.resolvers/sendMessage.resolver';
import { recipientUserResolver } from '@/modules/chatMessage/chatMessage.resolvers/recipientUser.resolver';
import { senderUserResolver } from '@/modules/chatMessage/chatMessage.resolvers/senderUser.resolver';
import { newMessageResolver } from '@/modules/chatMessage/chatMessage.resolvers/newMessage.resolver';
import { isSystemMessageResolver } from '@/modules/chatMessage/chatMessage.resolvers/isSystemMessage.resolver';
import { updateMessageResolver } from '@/modules/chatMessage/chatMessage.resolvers/updateMessage.resolver';

export const ChatMessageResolvers = {
  Subscription: {
    newMessage: {
      subscribe: newMessageResolver,
    },
  },
  Mutation: {
    sendMessage: sendMessageResolver,
    updateMessage: updateMessageResolver,
  },
  ChatMessage: {
    recipientUser: recipientUserResolver,
    senderUser: senderUserResolver,
    isSystemMessage: isSystemMessageResolver,
  },
};
