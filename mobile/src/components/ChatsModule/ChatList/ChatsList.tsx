import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import {
  StyleSheet, FlatList, View, RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import debounce from 'debounce-promise';
import { useSortedChats } from '@/controllers/chat/chat.hooks/useSortedChats';
import { useChatsContext } from '@/controllers/chat/chat.context';
import { getChatBuddyMeta } from '@/controllers/chat/chat.utils/getChatBuddyMeta';
import { ChatsItem } from '@/components/ChatsModule/ChatList/ChatsItem';
import { useChatParticipants } from '@/controllers/chat/chat.hooks/useChatParticipants';
import { EmptyChats } from '@/components/ChatsModule/ChatList/EmptyChats';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { useModal } from '@/controllers/app/app.hooks/useModal';
import { ChatTypes } from '@/controllers/chat/chat.interfaces';
import { BottomModal } from '@/components/BottomModal';
import { ChatItemActions } from '@/components/ChatsModule/ChatBox/ChatActions/ChatItemActions';
import { ChatsHeader } from '@/components/ChatsModule/ChatsHeader';

export const ChatsList: FC = () => {
  const { modalRef, openModal, closeModal } = useModal();

  const { selectedChatType, selectedChat } = useChatsContext();

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useTranslation([Namespaces.Chat]);

  const { data, fetchMore } = useChatParticipants({
    archived: selectedChatType === ChatTypes.Archive,
  });

  const chats = useSortedChats(data?.authUser?.profileConnections || []);

  const searchedChats = useMemo(() => {
    if (!searchQuery) {
      return chats;
    }

    return chats.filter((chat) => {
      const meta = getChatBuddyMeta(chat);
      const position = meta.profile.position?.includes(searchQuery);
      const name = meta.user?.computedName?.includes(searchQuery);

      return !!position || !!name;
    });
  }, [chats, searchQuery]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await fetchMore();

    setRefreshing(false);
  }, [fetchMore]);

  return (
    <>
      <ChatsHeader callback={debounce(setSearchQuery, 250)} />
      <View style={styles.container}>
        {searchedChats.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchedChats}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )}
            renderItem={({ item }) => {
              const chatMeta = getChatBuddyMeta(item);
              const lastActionTime = chatMeta?.user?.lastActionTime ?? null;

              return (
                <ChatsItem
                  hidden={!chatMeta.user}
                  chatId={item.id}
                  position={chatMeta.profile.position || 'Not filled'}
                  title={chatMeta.user ? chatMeta.user.computedName || '' : ''}
                  lastActionTime={lastActionTime}
                  unread={Number(item.unreadMessagesCount) > 0}
                  openModal={() => openModal()}
                />
              );
            }}
          />
        ) : (
          <EmptyChats
            title={t(`${Namespaces.Chat}:no_messages_yet`)}
            subtitle={t(`${Namespaces.Chat}:no_messages_description`)}
          />
        )}
        <BottomModal portal modalRef={modalRef}>
          <ChatItemActions
            selectedChat={selectedChat}
            selectedChatType={selectedChatType}
            onSubmit={closeModal}
          />
        </BottomModal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
