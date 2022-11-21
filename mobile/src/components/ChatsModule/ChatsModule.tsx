import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { FC } from 'react';
import { ChatsList } from '@/components/ChatsModule/ChatList/ChatsList';
import { ChatsContextProvider } from '@/controllers/chat/chat.context';
import { normalize } from '@/ui/theme/normalize';

export const ChatsModule: FC = () => (
  <ChatsContextProvider>
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ChatsList />
    </View>
  </ChatsContextProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: normalize(20, 'height'),
  },
});
