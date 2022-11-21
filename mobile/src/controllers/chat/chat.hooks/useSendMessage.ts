import { useCallback } from 'react';
import { useSendMessageMutation } from '@/controllers/graphql/generated';
import { saveMessageToCache } from '@/controllers/chat/chat.utils/saveChatMessageToCache';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

type SendMessageOptions = {
  chatId: number;
  message: string;
}

export const useSendMessage = () => {
  const logger = useLogger({ name: 'Send message' });
  const [sendMessage] = useSendMessageMutation({
    update(cache, { data }) {
      if (!data?.sendMessage) {
        return;
      }

      saveMessageToCache({
        cache,
        message: data.sendMessage,
      });
    },
  });

  const sendMessageCallback = useCallback(
    async (options: SendMessageOptions) => {

      try {
        await sendMessage({
          variables: {
            profileConnectionId: options.chatId,
            message: options.message,
          },
          optimisticResponse: (data) => ({
            sendMessage: {
              __typename: 'ChatMessage',
              id: Math.trunc(Math.random() * -1000),
              message: data.message,
              profileConnectionId: data.profileConnectionId,
              isSystemMessage: false,
              createdAt: new Date().toISOString(),
              senderUser: {
                isAuthUser: true,
                __typename: 'User',
              },
              recipientUser: {
                isAuthUser: false,
                __typename: 'User',
              },
            },
          }),
        });
      } catch (error) {
        logger.error(error.message);
      }
    }, [logger, sendMessage],
  );

  return [sendMessageCallback];
};
