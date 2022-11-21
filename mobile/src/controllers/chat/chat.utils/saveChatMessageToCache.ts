import { ApolloCache } from '@apollo/client';
import {
  ChatMessageBaseFragment,
  ChatMessageBaseFragmentDoc,
} from '@/controllers/graphql/generated';

interface SaveChatMessageToCache {
  (args: {
    cache: ApolloCache<any>;
    message: ChatMessageBaseFragment
  }): void
}

export const saveMessageToCache: SaveChatMessageToCache = (options) => {
  const { message, cache } = options;

  cache.modify({
    id: `ProfileConnection:${message.profileConnectionId}`,
    fields: {
      chatMessages(
        existingMessages: ChatMessageBaseFragment[] = [],
        { readField },
      ) {
        const newMessage = cache.writeFragment<
          ChatMessageBaseFragment
          >({
            data: message,
            fragment: ChatMessageBaseFragmentDoc,
          });

        if (!newMessage) {
          return existingMessages;
        }

        if (existingMessages.some(
          (chatMessage) => readField('id', chatMessage) === readField('id', newMessage),
        )) {
          return existingMessages;
        }

        return [...existingMessages, newMessage];
      },
    },
  });
};
