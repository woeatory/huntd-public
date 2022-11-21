import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '@/ui/theme/colors';
import { MessageBox } from '@/components/ChatsModule/ChatBox/MessageBox';
import { ChatInput } from '@/components/ChatsModule/ChatBox/ChatInput';
import { useProfileConnectionMetaQuery } from '@/controllers/graphql/generated';
import { ChatTitle } from '@/components/Header/ChatTitle';
import { getChatBuddyMeta } from '@/controllers/chat/chat.utils/getChatBuddyMeta';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { useModal } from '@/controllers/app/app.hooks/useModal';
import { BottomModal } from '@/components/BottomModal';
import { ChatBoxActions } from '@/components/ChatsModule/ChatBox/ChatActions/ChatBoxActions';
import { useShouldRenderShareContacts } from '@/controllers/chat/chat.hooks/useShouldRenderShareContacts';

interface Props {
  chatId: number;
}

export const ChatBox: FC<Props> = (props) => {
  const { chatId } = props;
  const { modalRef, openModal, closeModal } = useModal();
  const [repliedInChat, setRepliedInChat] = useState(true);

  const { data } = useProfileConnectionMetaQuery({
    variables: { profileConnectionId: chatId },
  });

  const shouldRenderShareContacts = useShouldRenderShareContacts(
    data?.profileConnection,
  );

  const shouldRenderActions = useMemo(
    () => [shouldRenderShareContacts].every(Boolean),
    [shouldRenderShareContacts],
  );

  const renderChatTitle = useCallback(() => {
    if (data?.profileConnection) {
      const { type, user, profile } = getChatBuddyMeta(data.profileConnection);
      const profileLastActionTime = profile?.lastActionTime ?? null;

      AnalyticsClient.logEvent(AnalyticsEvents.chatInteraction.ChatOpened);

      return (
        <ChatTitle
          avatar={user?.avatar?.url}
          hidden={!user}
          name={user?.computedName || ''}
          position={profile.position || ''}
          lastActionTime={profileLastActionTime}
          slug={profile.slug || ''}
          type={type}
          openActionsModal={openModal}
          renderActions={shouldRenderActions}
        />
      );
    }

    return null;
  }, [shouldRenderActions, data?.profileConnection, openModal]);

  return (
    <>
      {renderChatTitle()}

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={styles.container}
        keyboardVerticalOffset={0}
      >
        <MessageBox
          chatId={chatId}
          setRepliedInChat={setRepliedInChat}
        />
        <ChatInput
          chatId={chatId}
          repliedInChat={repliedInChat}
        />
      </KeyboardAvoidingView>

      {data?.profileConnection && (
        <BottomModal modalRef={modalRef}>
          <ChatBoxActions
            profileConnectionId={chatId}
            profileConnection={data.profileConnection}
            closeModal={closeModal}
          />
        </BottomModal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: Colors.White,
  },
});
