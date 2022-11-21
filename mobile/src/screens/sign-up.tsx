import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { SignUpModule } from '@/components/Authentication/SignUp';
import { GlobalStyles } from '@/ui/theme/globalStyles';

export const SignUpScreen: FC = () => (
  <SafeAreaView style={GlobalStyles.safeAreaView}>
    <SignUpModule />
  </SafeAreaView>
);
