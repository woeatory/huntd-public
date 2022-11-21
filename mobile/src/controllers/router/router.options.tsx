import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { StackRoutes } from '@/controllers/router/router.constants';
import { PreferencesHeaderLeft } from '@/components/Preferences/components/headers/PreferencesHeaderLeft';
import { NotificationsHeaderLeft } from '@/components/Preferences/components/headers/NotificationsHeaderLeft';

type StackRoutesOptionsInterface = {
  [key in StackRoutes]: StackNavigationOptions;
};

export const StackRoutesOptions: StackRoutesOptionsInterface = {
  [StackRoutes.Home]: {
    headerShown: false,
  },
  [StackRoutes.SignIn]: {
    headerShown: false,
  },
  [StackRoutes.SignUp]: {
    headerShown: false,
  },
  [StackRoutes.Chat]: {
    headerShown: false,
  },
  [StackRoutes.Candidate]: {
    headerShown: false,
  },
  [StackRoutes.Recruiter]: {
    headerShown: false,
  },
  [StackRoutes.Preferences]: {
    headerTransparent: true,
    headerTitle: '',
    headerLeft: () => <PreferencesHeaderLeft />,
  },
  [StackRoutes.Notifications]: {
    headerTransparent: true,
    headerTitle: '',
    headerLeft: () => <NotificationsHeaderLeft />,
  },
  [StackRoutes.ProfileFilling]: {
    headerShown: false,
  },
  [StackRoutes.Contacts]: {
    headerShown: false,
  },
  [StackRoutes.ItemSelection]: {
    headerShown: false,
  },
  [StackRoutes.CitySelection]: {
    headerShown: false,
  },
  [StackRoutes.TechnologiesSelection]: {
    headerShown: false,
  },
  [StackRoutes.LocationSelection]: {
    headerShown: false,
  },
};
