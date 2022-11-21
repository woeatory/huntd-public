import React, { FC, useCallback, useState } from 'react';
import {
  Platform,
  StyleSheet, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SendIcon } from '@/ui/icons/general/Sendicon';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { useSendMessage } from '@/controllers/chat/chat.hooks/useSendMessage';
import { Colors } from '@/ui/theme/colors';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { FastAnswersButtons } from '@/components/ChatsModule/ChatBox/ChatInput/components/FastAnswers';

interface Props {
  chatId: number;
  repliedInChat: boolean;
}

const MIN_CHAT_HEIGHT = 48;
const MAX_CHAT_HEIGHT = 200;

export const ChatInput: FC<Props> = (props) => {
  const { chatId, repliedInChat } = props;

  const [message, setMessage] = useState('');
  const [height, setHeight] = useState(MIN_CHAT_HEIGHT);
  const [sendMessage] = useSendMessage();

  const { t } = useTranslation([Namespaces.Chat]);

  const onSubmit = useCallback(async () => {
    if (!message.trim()) {
      return;
    }

    setMessage('');
    setHeight(MIN_CHAT_HEIGHT);

    await sendMessage({ chatId, message: message.trim() });

    AnalyticsClient.logEvent(AnalyticsEvents.chatInteraction.MessageSent);
  }, [chatId, message, sendMessage]);

  const onContentSizeChanged = useCallback(({ nativeEvent }) => {
    const { contentSize } = nativeEvent;
    const additionalMargin = Platform.OS === 'android' ? 6 : 28;
    const newChatHeight = Math.ceil(contentSize.height) + additionalMargin;

    if (newChatHeight < MAX_CHAT_HEIGHT) {
      setHeight(newChatHeight);
    }
  }, []);

  return (
    <>
      {!repliedInChat && (
        <FastAnswersButtons setMessage={setMessage} />
      )}
      <View
        style={[
          styles.container,
          { height },
        ]}
      >
        <TextInput
          accessible
          accessibilityLabel={t(`${Namespaces.Chat}:type_a_message`)}
          value={message}
          multiline
          style={styles.input}
          placeholder={t(`${Namespaces.Chat}:type_a_message`)}
          onChangeText={setMessage}
          blurOnSubmit={false}
          onContentSizeChange={onContentSizeChanged}
        />
        <TouchableOpacity
          onPress={onSubmit}
          style={[styles.icon, { height }]}
        >
          <SendIcon />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.LightGray,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    paddingRight: 52,
    paddingLeft: 16,
    marginBottom: 4,
  },
  icon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 56,
    width: 44,
    right: 0,
    bottom: 0,
    paddingBottom: 10,
  },
});
