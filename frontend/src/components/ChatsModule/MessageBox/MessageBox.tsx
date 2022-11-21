import React, {
  Dispatch,
  FC, SetStateAction, useEffect, useMemo, useRef,
} from 'react';
import { TFunction } from 'next-i18next';
import Linkify from 'react-linkify';
import { ChatMessage } from '@/components/ChatsModule/ChatMessage';
import {
  MessageUserRole,
  NewMessageDocument,
  useCandidateProfileBySlugQuery,
  NewMessageSubscription,
  useProfileConnectionMetaWithMessagesQuery,
  ProfileConnectionStatus,
} from '@/controllers/graphql/generated';
import { Loader } from '@/ui/Loader';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { getOuterHeight } from '@/lib/outerHeight';
import { MessageDivider } from '@/components/ChatsModule/MessageBox/MessageDivider';
import { getChatBuddyMeta, ChatBuddyMeta } from '@/controllers/buddyChat/buddyChat.utils/getChatBuddyMeta';
import { getChatUserMeta } from '@/controllers/buddyChat/buddyChat.utils/getChatUserMeta';
import { getMessageUserRole } from '@/controllers/buddyChat/buddyChat.utils/getMessageUserRole';
import { getShouldRenderDateDivider } from '@/controllers/buddyChat/buddyChat.utils/getShouldRenderDateDivider';
import { getMessageElementId } from '@/controllers/buddyChat/buddyChat.utils/getMessageElementId';
import { getScrollToMessageElements } from '@/controllers/buddyChat/buddyChat.utils/getScrollToMessageElements';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import styles from './MessageBox.module.scss';

interface Props {
  activeConnectionId: number
  repliedInChat: boolean
  setRepliedInChat: Dispatch<SetStateAction<boolean>>;
}

enum SystemMessages {
  connectionApproved = 'profile_connection_APPROVED',
}

const getSystemMessage = (
  message: string,
  buddyMeta: ChatBuddyMeta | null,
  t: TFunction,
): string => {
  if (!message) {
    return '';
  }

  switch (message) {
    case SystemMessages.connectionApproved: {
      return t(`${Namespaces.Chat}:${message}`);
    }

    default:
      return t(`${Namespaces.Chat}:${message}`);
  }
};

const UserMessagePlacementMap = {
  [MessageUserRole.Recipient]: ChatMessage.position.Left,
  [MessageUserRole.Sender]: ChatMessage.position.Right,
  [MessageUserRole.NotDefined]: ChatMessage.position.Center,
};

const UserMessageModeMap = {
  [MessageUserRole.Recipient]: ChatMessage.mode.Border,
  [MessageUserRole.Sender]: ChatMessage.mode.Background,
  [MessageUserRole.NotDefined]: ChatMessage.mode.System,
};

export const MessageBox: FC<Props> = React.memo((props) => {
  const { activeConnectionId, setRepliedInChat } = props;

  const {
    data,
    loading,
    subscribeToMore: newSubscribeToMore,
  } = useProfileConnectionMetaWithMessagesQuery({
    variables: {
      profileConnectionId: activeConnectionId,
    },
    ssr: true,
  });

  const {
    setCandidateUser,
    setIsUserCandidate,
  } = useBuddyChatContext();

  const chatMessages = useMemo(
    () => data?.profileConnection?.chatMessages || [],
    [data?.profileConnection?.chatMessages],
  );

  const messagesCount = chatMessages.length;

  useEffect(() => {
    const hasUserReplied = chatMessages.some(
      (message) => message.senderUser?.isAuthUser,
    );

    if (messagesCount) {
      setRepliedInChat(hasUserReplied);
    }
  }, [messagesCount, chatMessages, setRepliedInChat]);

  const { t } = useTranslation([Namespaces.Chat]);

  const unreadMessagesCount = (
     data?.profileConnection?.unreadMessagesCount ?? 0
  );

  const loadedRef = useRef(false);
  const messageBoxElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = newSubscribeToMore<NewMessageSubscription>({
      document: NewMessageDocument,
      variables: { profileConnectionId: activeConnectionId },
      updateQuery: (
        prev,
        { subscriptionData },
      ) => {
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
  }, [newSubscribeToMore, activeConnectionId]);

  useEffect(() => {
    if (!messageBoxElement.current || messagesCount === 0) {
      return;
    }

    const messageElements = getScrollToMessageElements({
      messageBox: messageBoxElement.current,
      messagesCount,
    });

    const initialMessage = messageElements.unread || messageElements.last;

    if (!initialMessage) {
      return;
    }

    const scrollDown = (element: Element) => {
      element.scrollIntoView({
        behavior: loadedRef.current
          ? 'smooth'
          : 'auto',
        block: 'end',
      });
    };

    if (!loadedRef.current) {
      // ugly hotfix scrolling down on navigation
      setTimeout(() => {
        scrollDown(initialMessage);
        loadedRef.current = true;
      }, 0);

      return;
    }

    if (!messageElements.last) {
      return;
    }

    const lastMessage = chatMessages[messagesCount - 1];

    if (lastMessage?.senderUser?.isAuthUser) {
      scrollDown(messageElements.last);

      return;
    }

    const { scrollHeight, scrollTop, clientHeight } = messageBoxElement.current;
    const messageHeight = getOuterHeight(
      messageElements.last as HTMLDivElement,
    );
    const bottom = scrollHeight - scrollTop - clientHeight - messageHeight;

    if (bottom < 50) {
      scrollDown(messageElements.last);
    }
  }, [
    messagesCount,
    messageBoxElement,
    chatMessages,
  ]);

  useEffect(() => () => {
    loadedRef.current = false;
  }, [activeConnectionId]);

  const buddyMeta = data?.profileConnection
    ? getChatBuddyMeta(data.profileConnection)
    : null;

  const userMeta = data?.profileConnection
    ? getChatUserMeta(data.profileConnection)
    : null;

  const userLastActionTime = data?.profileConnection
    ? data.profileConnection.userMeta?.lastActionTime || 0
    : 0;

  const buddyLastActionTime = data?.profileConnection
    ? (
      data.profileConnection.buddyMeta?.lastActionTime
      || 0)
    : 0;

  const areContactsOpened = (
    data?.profileConnection?.status === ProfileConnectionStatus.Approved
  );

  const userLastActionDate = new Date(userLastActionTime);

  const buddyLastActionDate = new Date(buddyLastActionTime);

  const { data: candidateData } = useCandidateProfileBySlugQuery({
    variables: {
      slug: buddyMeta?.type === 'RECRUITER'
        ? userMeta?.profile.slug || ''
        : buddyMeta?.profile.slug || '',
    },
  });

  const candidateUser = candidateData?.candidateProfileBySlug?.user;

  if (candidateUser) {
    setCandidateUser(candidateUser);
  }

  setIsUserCandidate(buddyMeta?.type === 'RECRUITER');

  return (
    <div
      className={styles.messageBox}
      ref={messageBoxElement}
    >
      <Loader active={loading} />
      {messagesCount > 0 && chatMessages.map(
        (message, index) => {
          const authUserRole = getMessageUserRole(message);

          const shouldRenderDivider = getShouldRenderDateDivider({
            index,
            messages: chatMessages,
            currentMessage: message,
          });

          const messageDate = new Date(message.createdAt);

          const withContactsPreview = (
            message.message === SystemMessages.connectionApproved
          );

          const messageText = message?.message ?? '';

          return (
            <React.Fragment key={message.id}>
              {shouldRenderDivider && (
                <MessageDivider createdAt={message.createdAt} />
              )}
              <ChatMessage
                avatar={
                  message.senderUser?.isAuthUser
                    ? userMeta?.user?.avatar
                    : buddyMeta?.user?.avatar
                }
                nfts={message.senderUser?.isAuthUser
                  ? userMeta?.user?.nfts
                  : buddyMeta?.user?.nfts}
                profileConnectionId={activeConnectionId}
                createdAt={message.createdAt}
                updatedAt={message.updatedAt || ''}
                position={UserMessagePlacementMap[authUserRole]}
                mode={UserMessageModeMap[authUserRole]}
                id={getMessageElementId(index)}
                messageId={message.id}
                unreadByUser={
                  !message.senderUser?.isAuthUser
                  && userLastActionDate.getTime() < messageDate.getTime()
                }
                unreadByBuddy={
                  !!message.senderUser?.isAuthUser
                  && buddyLastActionDate.getTime() < messageDate.getTime()
                }
                unreadMessagesCount={unreadMessagesCount}
                authUserRole={authUserRole}
                buddyType={buddyMeta?.type}
                withContactsPreview={withContactsPreview}
                areContactsOpened={areContactsOpened}
                messageText={messageText}
              >
                <Linkify
                  componentDecorator={(
                    decoratedHref: string,
                    decoratedText: string,
                    key: number,
                  ) => (
                    <a
                      target="blank"
                      href={decoratedHref}
                      key={key}
                      rel="noopener noreferrer"
                    >
                      {decoratedText}
                    </a>
                  )}
                >
                  {message.isSystemMessage
                    ? getSystemMessage(message.message || '', buddyMeta, t)
                    : message.message}
                </Linkify>
              </ChatMessage>
            </React.Fragment>
          );
        },
      )}
      {messagesCount === 0 && !loading && (
        <p className={styles.emptyMessage}>
          {t(`${Namespaces.Chat}:chat_is_empty`)}
        </p>
      )}
    </div>
  );
});
