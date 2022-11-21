import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ChatsTab } from '@/components/ChatsModule/ChatList/ChatsTab';
import { ChatTypes } from '@/controllers/chat/chat.interfaces';

export const ChatsSelectorTabs: FC = () => (
  <View style={styles.container}>
    {Object.values(ChatTypes).map((chat) => (
      <ChatsTab key={chat} chatType={chat} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
});
