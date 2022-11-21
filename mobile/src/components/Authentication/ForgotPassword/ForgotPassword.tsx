import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useTranslation } from 'react-i18next';
import Config from 'react-native-config';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';

export const ForgotPassword: FC = () => {
  const { t } = useTranslation([Namespaces.Auth]);

  const openBrowser = useCallback(() => {
    WebBrowser.openBrowserAsync(`${Config.API_ENDPOINT}/forgot-password`);
  }, []);

  return (
    <TouchableOpacity onPress={openBrowser}>
      <Text style={styles.link}>
        {t(`${Namespaces.Auth}:forgot_password_link`)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    ...typography.text,
    color: Colors.Citrus,
  },
});
