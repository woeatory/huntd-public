import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import {
  FlatList, RefreshControl, StyleSheet, View,
} from 'react-native';
import { MessageUserRole, useProfileConnectionMetaQuery } from '@/controllers/graphql/generated';
import { getMessageUserRole } from '@/controllers/chat/chat.utils/getMessageUserRole';
import { ChatMessage } from '@/components/ChatsModule/ChatBox/MessageBox/components/ChatMessage';
import { getShouldRenderDateDivider } from '@/controllers/chat/chat.utils/getShouldRenderDateDivider';
import { MessageDivider } from '@/components/ChatsModule/ChatBox/MessageBox/components/MessageDivider/MessageDivider';
import { getChatBuddyMeta } from '@/controllers/chat/chat.utils/getChatBuddyMeta';
import { useChatMessages } from '@/controllers/chat/chat.hooks/useChatMessages';
import { getChatUserMeta } from '@/controllers/chat/chat.utils/getChatUserMeta';
import { normalize } from '@/ui/theme/normalize';
import { SystemMessage } from '@/components/ChatsModule/ChatBox/MessageBox/components/SystemMessage';

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

interface Props {
  chatId: number;
  setRepliedInChat: (value: boolean) => void;
}

export const MessageBox: FC<Props> = (props) => {
  const { chatId = 0, setRepliedInChat } = props;

  const [refreshing, setRefreshing] = useState(false);

  const profileConnectionMeta = useProfileConnectionMetaQuery({
    variables: { profileConnectionId: chatId },
  });

  const chatMessagesQuery = useChatMessages({
    profileConnectionId: chatId,
  });

  const { fetchMore, data } = chatMessagesQuery;

  const { messagesCount, chatMessages } = useMemo(
    () => ({
      messagesCount: data?.profileConnection?.chatMessages?.length ?? 0,
      chatMessages: data?.profileConnection?.chatMessages || [],
    }),
    [data],
  );

  useEffect(() => {
    if (messagesCount) {
      setRepliedInChat(chatMessages.some(
        (message) => message.senderUser?.isAuthUser,
      ));
    }
  }, [chatMessages, messagesCount, setRepliedInChat]);

  const invertedMessages = useMemo(
    () => [...chatMessages].reverse(),
    [chatMessages],
  );

  const buddyMeta = profileConnectionMeta.data?.profileConnection
    ? getChatBuddyMeta(profileConnectionMeta.data.profileConnection)
    : null;

  const userMeta = profileConnectionMeta.data?.profileConnection
    ? getChatUserMeta(profileConnectionMeta.data.profileConnection)
    : null;

  const buddyLastActionTime = profileConnectionMeta.data?.profileConnection
    ? (profileConnectionMeta.data.profileConnection.buddyMeta?.lastActionTime
      || 0)
    : 0;

  const buddyLastActionDate = new Date(buddyLastActionTime);

  return (
    <View style={styles.container}>
      {messagesCount > 0 && (
        <FlatList
          inverted
          onEndReached={fetchMore}
          onEndReachedThreshold={0.7}
          showsVerticalScrollIndicator={false}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await chatMessagesQuery.fetchMore();
                setRefreshing(false);
              }}
            />
          )}
          data={invertedMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            const authUserRole = getMessageUserRole(item);

            const shouldRenderDivider = getShouldRenderDateDivider({
              index,
              messages: invertedMessages,
              currentMessage: item,
            });

            const isHidden = (
              authUserRole === MessageUserRole.Recipient && !buddyMeta?.user
            );

            const chatMessageMeta = item.senderUser?.isAuthUser
              ? userMeta
              : buddyMeta;

            const messageDate = new Date(item.createdAt);
            const unreadByBuddy = (
              !!item.senderUser?.isAuthUser && (
                buddyLastActionDate.getTime() < messageDate.getTime()
              )
            );

            return (
              <>
                {item.isSystemMessage
                  ? (
                    <SystemMessage
                      message={item.message || ''}
                      messageDate={item.createdAt}
                    />
                  )
                  : (
                    <ChatMessage
                      avatar={chatMessageMeta?.user?.avatar?.url}
                      type={chatMessageMeta?.type}
                      profileSlug={chatMessageMeta?.profile.slug}
                      hidden={isHidden}
                      date={item.createdAt}
                      message={item.message || ''}
                      position={UserMessagePlacementMap[authUserRole]}
                      mode={UserMessageModeMap[authUserRole]}
                      unreadByBuddy={unreadByBuddy}
                      authUserRole={authUserRole}
                    />
                  )}
                {shouldRenderDivider && (
                  <MessageDivider createdAt={item.createdAt} />
                )}
              </>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    paddingHorizontal: normalize(12),
  },
});
