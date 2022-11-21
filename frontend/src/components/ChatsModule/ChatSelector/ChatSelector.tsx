import React, { useEffect, useMemo, FC } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { ChatSelectorItem } from '@/components/ChatsModule/ChatSelectorItem';
import {
  ProfileConnectionUpdatedDocument,
  ProfileConnectionUpdatedSubscription,
  useAuthUserConnectionsQuery,
  useProfileConnectionMetaQuery,
} from '@/controllers/graphql/generated';
import { Loader } from '@/ui/Loader';
import { getFilledValue } from '@/lib/getFilledValue';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import { getChatBuddyMeta } from '@/controllers/buddyChat/buddyChat.utils/getChatBuddyMeta';
import { Router } from '@/controllers/i18n/i18n.client';
import { Selectors } from '@/lib/selectors';
import { ChatSelectorTabs } from '@/components/ChatsModule/ChatSelector/ChatSelectorTabs';
import { ChatTypes } from '@/controllers/buddyChat/buddyChat.typedefs';
import { useSortedChats } from '@/controllers/buddyChat/buddyChat.hooks/useSortedChats';
import { createLink } from '@/controllers/buddyChat/buddyChat.utils/createLink';
import { ChatsConnectionsHintBlock } from '@/components/ChatsModule/ChatSelector/ChatsConnectionsHintBlock';
import styles from './ChatSelector.module.scss';

const parseLink = (link: string) => {
  const [id, ...rest] = link.split('-');

  return {
    id: Number(id),
    slug: rest.join('-'),
  };
};

interface Props {
  isRecruiter: boolean;
}

export const ChatSelector:FC<Props> = ({ isRecruiter }) => {
  const {
    activeConnectionId,
    setActiveConnectionId,
    selectedChats,
    setSelectedChats,
  } = useBuddyChatContext();

  const { loading, data, subscribeToMore } = useAuthUserConnectionsQuery({
    variables: {
      archived: selectedChats === ChatTypes.Archive,
    },
  });

  const profileConnectionsCount
    = data?.authUser?.profileConnections?.length || 0;

  const authUser = data?.authUser ?? null;

  const router = useRouter();

  const { query: { slug } } = router;

  const profileConnectionId = slug
    ? parseLink(slug as string).id
    : 0;

  const { data: existingConnection } = useProfileConnectionMetaQuery({
    variables: {
      profileConnectionId,
    },
  });

  const isQueryConnectionArchived = (
    !!existingConnection?.profileConnection?.userMeta?.archivedAt
  );

  useEffect(() => {
    if (isQueryConnectionArchived) {
      setSelectedChats(ChatTypes.Archive);
    } else {
      setSelectedChats(ChatTypes.All);
    }
  }, [isQueryConnectionArchived, setSelectedChats]);

  const profileConnections = useMemo(() => {
    const activeConnection = data?.authUser?.profileConnections?.find(
      (connection) => connection.id === activeConnectionId
    );

    const queryConnection = slug
      ? data?.authUser?.profileConnections?.find(
        (connection) => connection.id === parseLink(slug as string).id
      )
      : null;

    return {
      activeConnection,
      queryConnection,
    };
  }, [slug, data?.authUser?.profileConnections, activeConnectionId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const {
        activeConnection,
        queryConnection,
      } = profileConnections;

      if (queryConnection) {
        setActiveConnectionId(queryConnection.id);

        return;
      }

      if (activeConnection && !queryConnection) {
        const chatBuddyMeta = getChatBuddyMeta(activeConnection);

        Router.replace(
          createLink(activeConnection.id, chatBuddyMeta.profile.slug || ''),
        );
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [profileConnections, setActiveConnectionId]);

  useEffect(() => {
    const unsubscribe = subscribeToMore<ProfileConnectionUpdatedSubscription>({
      document: ProfileConnectionUpdatedDocument,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData || !prev.authUser) {
          return prev;
        }

        const { profileConnectionUpdated } = subscriptionData.data;

        return {
          authUser: {
            ...prev.authUser,
            profileConnections: (prev.authUser.profileConnections || []).map(
              (profileConnection) => {
                if (profileConnection.id === profileConnectionUpdated.id) {
                  return {
                    ...profileConnection,
                    ...profileConnectionUpdated,
                  };
                }

                return profileConnection;
              },
            ),
          },
        };
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  const chats = useSortedChats(data?.authUser?.profileConnections || []);

  const shouldHintBlockBeRendered = isRecruiter
    && profileConnectionsCount < 20 && selectedChats !== ChatTypes.Archive;

  return (
    <div className={cn(styles.chatSelector, {
      [Selectors.Active]: activeConnectionId === 0,
    })}
    >
      <ChatSelectorTabs />

      <Loader active={loading} />
      {chats.map((profileConnection) => {
        const chatBuddyMeta = getChatBuddyMeta(profileConnection);

        if (!chatBuddyMeta) {
          return null;
        }

        const buddyLastActionTime = chatBuddyMeta?.profile?.lastActionTime
          ?? null;

        const companyName = authUser?.id === profileConnection.candidateUser?.id
          ? profileConnection.recruiterProfile.companyName
          : null;

        return (
          <ChatSelectorItem
            id={profileConnection.id}
            key={profileConnection.id}
            link={createLink(profileConnection.id, chatBuddyMeta.profile.slug || '')}
            active={activeConnectionId === profileConnection.id}
            title={getFilledValue(chatBuddyMeta.profile.position)}
            unread={Number(profileConnection.unreadMessagesCount) > 0}
            companyName={companyName}
            lastActionTime={buddyLastActionTime}
            name={chatBuddyMeta.user
              ? chatBuddyMeta.user.computedName || undefined
              : undefined}
          />
        );
      })}
      <div className={styles.chatSelectorDivider} />
      {shouldHintBlockBeRendered
        && !!profileConnectionsCount
        && (
        <ChatsConnectionsHintBlock
          connectionsCount={profileConnectionsCount}
        />
        )}
    </div>
  );
};
