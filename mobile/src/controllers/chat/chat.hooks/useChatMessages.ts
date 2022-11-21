import { useCallback, useEffect } from 'react';
import {
  NewMessageDocument,
  NewMessageSubscription,
  useProfileConnectionMessagesQuery,
} from '@/controllers/graphql/generated';

type UseChatMessagesOptions = {
  profileConnectionId: number;
}

export const useChatMessages = (options: UseChatMessagesOptions) => {
  const { profileConnectionId } = options;

  const {
    data,
    fetchMore: fetchMoreMessages,
    loading,
    subscribeToMore,
    ...other
  } = useProfileConnectionMessagesQuery({
    variables: { profileConnectionId },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore<NewMessageSubscription>({
      document: NewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.newMessage || !prev.profileConnection) {
          return prev;
        }

        const { newMessage } = subscriptionData.data;

        if (!newMessage
            || prev.profileConnection.id !== newMessage.profileConnectionId
        ) {
          return prev;
        }

        if (
          prev.profileConnection.chatMessages?.some(
            (message) => message.id === newMessage.id,
          )
        ) {
          return prev;
        }

        return {
          profileConnection: {
            ...prev.profileConnection,
            chatMessages: [
              ...(prev.profileConnection.chatMessages || []),
              newMessage,
            ],
          },
        };
      },
    });

    return () => unsubscribe();
  }, []);

  const fetchMore = useCallback(async () => {
    if (!data || loading) {
      return;
    }

    await fetchMoreMessages({
      variables: { profileConnectionId },
    });
  }, [data, fetchMoreMessages, loading, profileConnectionId]);

  return {
    ...other, data, loading, fetchMore,
  };
};
