import React, { FC, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useHeaderHeight } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { PreferencesLink } from '@/components/Preferences/components/PreferencesLink';
import { StackRoutes } from '@/controllers/router/router.constants';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';

export const Preferences: FC = () => {
  const { t } = useTranslation([Namespaces.Common]);
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  const { nativeBuildVersion, nativeAppVersion } = Constants;
  const version = `${nativeAppVersion} ${nativeBuildVersion}`;

  const preferencesLinks = useMemo(() => ([
    {
      onPress: () => navigation.navigate(StackRoutes.Notifications),
      text: t(`${Namespaces.Common}:notifications`),
    },
    {
      onPress: () => WebBrowser.openBrowserAsync(`https://huntd.tech/privacy-policy.pdf`),
      text: t(`${Namespaces.Common}:privacy_policy`),
    },
  ]), [navigation, t]);

  return (
    <View style={[styles.container, { paddingTop: headerHeight + 16 }]}>
      <View style={styles.links}>
        {preferencesLinks.map((link) => (
          <PreferencesLink
            key={link.text}
            text={link.text}
            onPress={link.onPress}
          />
        ))}
      </View>
      <View style={styles.versionContainer}>
        <Text style={[styles.version, typography.text]}>
          {t(`${Namespaces.Common}:mobile_version`, {
            version,
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  versionContainer: {
    paddingVertical: 16,
  },
  version: {
    textAlign: 'center',
    color: Colors.Semidark,
  },
  links: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(209, 204, 201, 0.4)',
  },
});
