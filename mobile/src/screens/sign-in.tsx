import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SignInModule } from '@/components/Authentication/SignIn';
import { GlobalStyles } from '@/ui/theme/globalStyles';

export const SignInScreen: FC = () => (
  <SafeAreaView style={GlobalStyles.safeAreaView}>
    <StatusBar style="dark" />
    <SignInModule />
  </SafeAreaView>
);
