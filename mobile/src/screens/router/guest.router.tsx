import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackRoutes } from '@/controllers/router/router.constants';
import { SignInScreen } from '@/screens/sign-in';
import { SignUpScreen } from '@/screens/sign-up';
import { StackRoutesOptions } from '@/controllers/router/router.options';

const { Navigator, Screen } = createStackNavigator();

export const GuestRouter: FC = () => (
  <Navigator>
    <Screen
      name={StackRoutes.SignIn}
      component={SignInScreen}
      options={StackRoutesOptions.SignIn}
    />
    <Screen
      name={StackRoutes.SignUp}
      component={SignUpScreen}
      options={StackRoutesOptions.SignUp}
    />
  </Navigator>
);
