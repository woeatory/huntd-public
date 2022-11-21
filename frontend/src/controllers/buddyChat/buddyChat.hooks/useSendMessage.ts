import { useSendMessageMutation } from '@/controllers/graphql/generated';
import { saveMessageToCache } from '@/controllers/buddyChat/buddyChat.utils/saveChatMessageToCache';

export const useSendMessage = () => useSendMessageMutation({
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
