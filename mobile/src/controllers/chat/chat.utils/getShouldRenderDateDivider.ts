import { ChatMessageBaseFragment } from '@/controllers/graphql/generated';

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

interface GetShouldRenderDateDivider {
  (options: {
    index: number,
    currentMessage: ChatMessageBaseFragment,
    messages: ChatMessageBaseFragment[]
  }): boolean
}
export const getShouldRenderDateDivider: GetShouldRenderDateDivider = ({
  index,
  currentMessage,
  messages,
}) => {
  if (index === messages.length - 1) {
    return true;
  }

  const prevMessage = messages![index + 1];

  const prevDate = dateFormatter.format(
    new Date(prevMessage.createdAt),
  );
  const currentDate = dateFormatter.format(
    new Date(currentMessage.createdAt),
  );

  return prevDate !== currentDate;
};
