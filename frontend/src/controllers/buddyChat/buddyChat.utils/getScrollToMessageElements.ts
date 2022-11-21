import { getMessageElementId } from '@/controllers/buddyChat/buddyChat.utils/getMessageElementId';

interface GetScrollToMessageElements {
  (options: {
    messageBox: HTMLDivElement,
    messagesCount: number
  }): {
    unread: Element | null,
    last: Element | null
  }
}
export const getScrollToMessageElements: GetScrollToMessageElements = ({
  messageBox,
  messagesCount,
}) => {
  const unreadMessage = messageBox.querySelector(
    `[data-unread="true"]`,
  );

  const lastMessageIndex = messagesCount - 1;

  const lastMessage = messageBox.querySelector(
    `[data-message-id="${getMessageElementId(lastMessageIndex)}"]`,
  );

  return {
    unread: unreadMessage,
    last: lastMessage,
  };
};
