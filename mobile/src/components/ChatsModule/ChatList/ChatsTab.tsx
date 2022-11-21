import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useChatsContext } from '@/controllers/chat/chat.context';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { FontFamilies } from '@/ui/theme/fonts';
import { ChatTypes } from '@/controllers/chat/chat.interfaces';

interface Props {
  chatType: ChatTypes;
}

export const ChatsTab: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Chat]);
  const { selectedChatType, setSelectedChatType } = useChatsContext();
  const { chatType } = props;

  const isSelected = selectedChatType === chatType;

  return (
    <TouchableOpacity
      onPress={() => setSelectedChatType(chatType)}
    >
      <Text
        style={[
          styles.item,
          {
            color: isSelected ? Colors.Citrus : Colors.LightGray,
          },
        ]}
      >
        {t(`${Namespaces.Chat}:${chatType}_chats`)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    fontFamily: FontFamilies.Bold,
    textTransform: 'uppercase',
  },
});
