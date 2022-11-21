import React, { FC, useCallback, useMemo } from 'react';
import {
  StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';
import { useProfileConnectionMetaQuery } from '@/controllers/graphql/generated';
import { getChatBuddyMeta } from '@/controllers/chat/chat.utils/getChatBuddyMeta';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { useArchiveChat } from '@/controllers/chat/chat.hooks/useArchiveChat';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { useDeleteChat } from '@/controllers/chat/chat.hooks/useDeleteChat';
import { ChatTypes } from '@/controllers/chat/chat.interfaces';

interface Props {
  onSubmit: () => void,
  selectedChat: number;
  selectedChatType: ChatTypes;
}

export const ChatItemActions: FC<Props> = (props) => {
  const { selectedChat, selectedChatType, onSubmit } = props;

  const logger = useLogger({ name: 'Long press actions' });

  const [archiveChatMutation] = useArchiveChat();
  const [deleteChatMutation] = useDeleteChat();

  const { data } = useProfileConnectionMetaQuery({
    variables: { profileConnectionId: selectedChat },
  });

  const userInfo = useMemo(() => {
    if (data?.profileConnection) {
      const { user } = getChatBuddyMeta(data.profileConnection);

      return user;
    }

    return null;
  }, [data?.profileConnection]);

  const archiveChat = useCallback(async () => {
    try {
      await archiveChatMutation({
        variables: { id: selectedChat },
      });
      onSubmit();
    } catch (error) {
      logger.error(error);
    }
  }, [selectedChat, archiveChatMutation]);

  const deleteChat = useCallback(async () => {
    try {
      await deleteChatMutation({
        variables: { id: selectedChat },
      });
      onSubmit();
    } catch (error) {
      logger.error(error);
    }
  }, [deleteChatMutation, selectedChat]);

  const renderArchiveAction = useMemo(() => (
    selectedChatType === ChatTypes.All
  ), [selectedChatType]);

  return userInfo ? (
    <View style={styles.container}>
      <View style={[styles.content, styles.heading]}>
        <Text style={styles.text}>
          {userInfo.computedName}
        </Text>
      </View>
      {renderArchiveAction && (
        <TouchableHighlight
          onPress={archiveChat}
          underlayColor="rgba(209, 204, 201, 0.2)"
          style={styles.content}
        >
          <Text style={styles.text}>Archive chat</Text>
        </TouchableHighlight>
      )}

      <TouchableHighlight
        onPress={deleteChat}
        underlayColor="rgba(209, 204, 201, 0.2)"
        style={styles.content}
      >
        <Text style={styles.alertText}>Delete chat</Text>
      </TouchableHighlight>
    </View>
  ) : <View />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    paddingBottom: 42,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  heading: {
    borderBottomWidth: 1,
    borderColor: Colors.LightGray,
  },
  text: {
    ...typography.text,
    color: Colors.Semidark,
  },
  alertText: {
    ...typography.text,
    color: Colors.Error,
  },
});
