import React, { FC } from 'react';
import {
  Text, View, StyleSheet, Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { GoogleSocialButton } from '@/components/Authentication/SocialButtons/components/GoogleSocialButton';
import { AppleSocialButton } from '@/components/Authentication/SocialButtons/components/AppleSocialButton';
import { PlatformOS } from '@/controllers/app/app.interfaces';

export const SocialButtons: FC = () => {
  const { t } = useTranslation([Namespaces.Auth]);

  return (
    <View style={styles.container}>
      <View style={styles.overhead}>
        <Text style={styles.textOverhead}>
          {t(`${Namespaces.Auth}:sign_in_with`)}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <GoogleSocialButton />
        {Platform.OS === PlatformOS.iOS && (
          <AppleSocialButton />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overhead: {
    marginBottom: 16,
  },
  textOverhead: {
    ...typography.text,
    color: Colors.Gray,
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
