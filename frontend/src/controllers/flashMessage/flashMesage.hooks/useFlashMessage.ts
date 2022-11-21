import {
  FlashMessageType,
  useDeleteMessageMutation,
  usePostMessageMutation,
} from '@/controllers/graphql/generated';

export const useFlashMessage = () => {
  const [postMessage] = usePostMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const messageTypes = FlashMessageType;

  return { postMessage, deleteMessage, messageTypes };
};
