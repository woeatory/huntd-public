import React, { FC } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { ChatBox } from '@/components/ChatsModule/ChatBox/ChatBox';
import { GlobalStyles } from '@/ui/theme/globalStyles';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.Chat>

export const ChatScreen: FC = () => {
  const route = useRoute<RouteProps>();

  return (
    <SafeAreaView style={GlobalStyles.safeAreaView}>
      <ChatBox chatId={route.params.chatId} />
    </SafeAreaView>
  );
};
