import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackRoutes } from '@/controllers/router/router.constants';
import { HomeScreen } from '@/screens/home';
import { StackRoutesOptions } from '@/controllers/router/router.options';
import { ChatScreen } from '@/screens/chat';
import { CandidateScreen } from '@/screens/candidate';
import { RecruiterScreen } from '@/screens/recruiter';
import { PreferencesScreen } from '@/screens/preferences';
import { NotificationsScreen } from '@/screens/notifications';
import { ProfileFillingScreen } from '@/screens/profileFilling';
import { ContactsScreen } from '@/screens/contacts';
import { ItemSelectionScreen } from '@/screens/actions/itemSelection';
import { CitySelectionScreen } from '@/screens/actions/citySelection';
import { TechnologiesSelectionScreen } from '@/screens/actions/technologiesSelection';
import { LocationSelectionScreen } from '@/screens/actions/locationSelection';

const { Navigator, Screen } = createStackNavigator();

export const AuthRouter: FC = () => (
  <Navigator>
    <Screen
      name={StackRoutes.Home}
      component={HomeScreen}
      options={StackRoutesOptions.Home}
    />
    <Screen
      name={StackRoutes.Chat}
      component={ChatScreen}
      options={StackRoutesOptions.Chat}
    />
    <Screen
      name={StackRoutes.Candidate}
      component={CandidateScreen}
      options={StackRoutesOptions.Candidate}
    />
    <Screen
      name={StackRoutes.Recruiter}
      component={RecruiterScreen}
      options={StackRoutesOptions.Recruiter}
    />
    <Screen
      name={StackRoutes.Preferences}
      component={PreferencesScreen}
      options={StackRoutesOptions.Preferences}
    />
    <Screen
      name={StackRoutes.Notifications}
      component={NotificationsScreen}
      options={StackRoutesOptions.Notifications}
    />
    <Screen
      name={StackRoutes.ProfileFilling}
      component={ProfileFillingScreen}
      options={StackRoutesOptions.ProfileFilling}
    />
    <Screen
      name={StackRoutes.Contacts}
      component={ContactsScreen}
      options={StackRoutesOptions.Contacts}
    />
    <Screen
      name={StackRoutes.ItemSelection}
      component={ItemSelectionScreen}
      options={StackRoutesOptions.ItemSelection}
    />
    <Screen
      name={StackRoutes.CitySelection}
      component={CitySelectionScreen}
      options={StackRoutesOptions.CitySelection}
    />
    <Screen
      name={StackRoutes.TechnologiesSelection}
      component={TechnologiesSelectionScreen}
      options={StackRoutesOptions.TechnologiesSelection}
    />
    <Screen
      name={StackRoutes.LocationSelection}
      component={LocationSelectionScreen}
      options={StackRoutesOptions.LocationSelection}
    />
  </Navigator>
);
