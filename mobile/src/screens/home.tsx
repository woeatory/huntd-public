import React, { FC, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Host } from 'react-native-portalize';
import { HomeTabs } from '@/controllers/router/router.constants';
import { ChatsScreen } from '@/screens/chats';
import { ProfileScreen } from '@/screens/profile';
import { ChatIcon } from '@/ui/icons/general/ChatIcon';
import { ProfileIcon } from '@/ui/icons/general/ProfileIcon';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { ProfileProvider } from '@/controllers/profile/profile.context';
import { PrimaryProfile } from '@/controllers/graphql/generated';
import { useConfigureNotifications } from '@/controllers/notifications/notifications.hooks/useConfigureNotifications';
import { JobsScreen } from '@/screens/jobs/jobs';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import { LinkIcon } from '@/ui/icons/general/LinkIcon';

const Tab = createBottomTabNavigator();

export const HomeScreen: FC = () => {
  const [profileType, setProfileType] = useState(PrimaryProfile.NotDefined);
  const { t } = useTranslation([Namespaces.Common]);

  const [configureNotifications] = useConfigureNotifications();
  const jobsFeature = useFeature(Features.Jobs);

  useEffect(() => {
    configureNotifications();
  }, []);

  return (
    <ProfileProvider data={{ profileType, setProfileType }}>
      <Host>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: Colors.Citrus,
            inactiveTintColor: Colors.Gray,
            style: {
              backgroundColor: Colors.Background,
            },
          }}
        >
          <Tab.Screen
            name={HomeTabs.Chats}
            component={ChatsScreen}
            options={{
              title: t(`${Namespaces.Common}:chats_link`),
              tabBarIcon: ({ focused }) => {
                const { LightGray, Citrus } = Colors;

                return <ChatIcon color={focused ? Citrus : LightGray} />;
              },
            }}
          />
          {jobsFeature.isEnabled() && (
            <Tab.Screen
              name={HomeTabs.Jobs}
              component={JobsScreen}
              options={{
                title: t(`${Namespaces.Common}:jobs_link`),
                tabBarIcon: ({ focused }) => {
                  const { LightGray, Citrus } = Colors;

                  return <LinkIcon color={focused ? Citrus : LightGray} />;
                },
              }}
            />
          )}
          <Tab.Screen
            name={HomeTabs.Profile}
            component={ProfileScreen}
            options={{
              title: t(`${Namespaces.Common}:my_profile`),
              tabBarIcon: ({ focused }) => {
                const { LightGray, Citrus } = Colors;

                return <ProfileIcon color={focused ? Citrus : LightGray} />;
              },
            }}
          />
        </Tab.Navigator>
      </Host>
    </ProfileProvider>
  );
};
