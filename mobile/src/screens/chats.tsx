import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { ChatsModule } from '@/components/ChatsModule';
import { GlobalStyles } from '@/ui/theme/globalStyles';

export const ChatsScreen: FC = () => (
  <SafeAreaView style={GlobalStyles.safeAreaView}>
    <ChatsModule />
  </SafeAreaView>
);
