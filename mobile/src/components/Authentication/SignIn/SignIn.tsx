import React, { FC, useCallback } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import { SignInForm } from '@/components/Authentication/SignIn/SignInForm';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { BreakLine } from '@/ui/icons/general/BreakLine';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { ForgotPassword } from '@/components/Authentication/ForgotPassword';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import { SocialButtons } from '@/components/Authentication/SocialButtons';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { StackRoutes } from '@/controllers/router/router.constants';
import { normalize } from '@/ui/theme/normalize';

export const SignInModule: FC = () => {
  const { t } = useTranslation([Namespaces.Auth]);
  const socialButtonsFeature = useFeature(Features.SocialButtons);
  const navigation = useNavigation();

  const handleSignUp = useCallback(() => {
    navigation.navigate(StackRoutes.SignUp);
    AnalyticsClient.logEvent(AnalyticsEvents.cta.SignUpLinkClick);
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {t(`${Namespaces.Auth}:sign_in_page_underhead`)}
      </Text>
      <View style={styles.form}>
        <SignInForm />
      </View>
      <View style={{ marginBottom: 24 }}>
        <ForgotPassword />
      </View>
      {socialButtonsFeature.isEnabled() && Constants.isDevice && (
        <>
          <View style={{ marginBottom: 24 }}>
            <BreakLine />
          </View>
          <View style={{ marginBottom: 24 }}>
            <SocialButtons />
          </View>
        </>
      )}
      <View>
        <Text style={styles.text}>
          {t(`${Namespaces.Auth}:sign_up_text`)}
        </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.link}>
            {t(`${Namespaces.Auth}:sign_up_link`)}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(32, 'height'),
    paddingHorizontal: normalize(20),
  },
  form: {
    marginBottom: normalize(14),
  },
  heading: {
    ...typography.heading,
    color: Colors.Citrus,
    marginBottom: normalize(32),
  },
  text: {
    ...typography.text,
    fontSize: normalize(16),
    color: Colors.Gray,
  },
  link: {
    ...typography.text,
    fontSize: normalize(16),
    color: Colors.Citrus,
  },
});
