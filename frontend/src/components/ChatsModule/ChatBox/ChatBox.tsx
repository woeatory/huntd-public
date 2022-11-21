import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { MessageForEditInfo } from '@/components/ChatsModule/ChatBox/MessageForEditInfo/MessageForEditInfo';
import { ChatInput } from '@/components/ChatsModule/ChatInput';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import { EmptyMessageBox } from '@/components/ChatsModule/MessageBox/EmptyMessageBox';
import { Routes } from '@/controllers/router/router.constants';
import { ChatsPageTitle } from '@/components/ChatsModule/ChatsPageTitle';
import { analytics } from '@/controllers/analytics/analytics.client';
import { Selectors } from '@/lib/selectors';
import { useAuthUserConnectionsQuery } from '@/controllers/graphql/generated';
import { ChatTypes } from '@/controllers/buddyChat/buddyChat.typedefs';
import styles from './ChatBox.module.scss';

interface Props {
  chatTypes: ChatTypes
  isRecruiter: boolean;
}

const MessageBox = dynamic(
  async () => {
    const mod = await import('@/components/ChatsModule/MessageBox');

    return mod.MessageBox;
  },
  {
    ssr: false,
  },
);

const ConnectionsBox = dynamic(
  async () => {
    const mod = await import('@/components/ChatsModule/MessageBox/ConnectionsBox');

    return mod.ConnectionsBox;
  },
  {
    ssr: false,
  },
);

const ChatBuddyInfo = dynamic(
  async () => {
    const mod = await import('@/components/ChatsModule/ChatBuddyInfo');

    return mod.ChatBuddyInfo;
  },
  {
    ssr: false,
  },
);

const MobileAppBox = dynamic(
  async () => {
    const mod = await import('@/components/ChatsModule/MessageBox/MobileAppBox');

    return mod.MobileAppBox;
  },
  {
    ssr: false,
  },
);

export const ChatBox:FC<Props> = React.memo((props) => {
  const { chatTypes, isRecruiter } = props;
  const [repliedInChat, setRepliedInChat] = useState(true);

  const { activeConnectionId, setActiveConnectionId } = useBuddyChatContext();
  const { isMessageEditing } = useBuddyChatContext();

  const router = useRouter();

  useEffect(() => {
    const { query } = router;

    if (query.slug) {
      analytics.sendEvent(
        analytics.events.chatInteraction.ChatOpened,
        {},
      );
    }

    if (query.utm_campaign || query.utm_source || query.utm_medium) {
      router.replace(
        `${Routes.Chats}/${query.slug}`,
        undefined,
        { shallow: true },
      );
    }
  }, [router]);

  const { data } = useAuthUserConnectionsQuery({
    variables: {
      archived: chatTypes === ChatTypes.Archive,
    },
  });

  const profileConnectionsCount
    = data?.authUser?.profileConnections?.length || 0;

  const shouldFABeVisible = !repliedInChat;

  if (!profileConnectionsCount && !isRecruiter) {
    return <MobileAppBox />;
  }

  if (!profileConnectionsCount && isRecruiter) {
    return (
      <ConnectionsBox
        profileConnectionsCount={profileConnectionsCount}
      />
    );
  }

  return (
    <div
      className={cn(styles.chatBox, {
        [Selectors.Active]: activeConnectionId > 0,
      })}
    >
      <ChatsPageTitle profileConnectionId={activeConnectionId} />

      {activeConnectionId > 0
        ? (
          <>
            <ChatBuddyInfo
              profileConnectionId={activeConnectionId}
              setActiveConnectionId={setActiveConnectionId}
            />

            <MessageBox
              repliedInChat={repliedInChat}
              setRepliedInChat={setRepliedInChat}
              activeConnectionId={activeConnectionId}
            />

            {isMessageEditing && <MessageForEditInfo />}

            <ChatInput
              profileConnectionId={activeConnectionId}
              shouldFABeVisible={shouldFABeVisible}
            />
          </>
        )
        : (
          <EmptyMessageBox />
        )}
    </div>
  );
});
