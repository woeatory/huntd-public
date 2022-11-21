import React, { FC } from 'react';
import {
  Text, View, StyleSheet, ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { SignUpForm } from '@/components/Authentication/SignUp/SignUpForm';
import { BackButton } from '@/components/Header/BackButton';
import { Colors } from '@/ui/theme/colors';
import { normalize } from '@/ui/theme/normalize';
import { typography } from '@/ui/typography/typography.module';
import { BreakLine } from '@/ui/icons/general/BreakLine';
import { SocialButtons } from '@/components/Authentication/SocialButtons';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';

export const SignUpModule: FC = () => {
  const { t } = useTranslation([Namespaces.Auth]);
  const socialButtonsFeature = useFeature(Features.SocialButtons);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <View style={styles.backButton}>
          <BackButton color={Colors.Citrus} />
        </View>
        <Text style={styles.backButtonText}>
          {t(`${Namespaces.Auth}:sign_up_page_underhead`)}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <SignUpForm />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(32, 'height'),
    paddingHorizontal: normalize(20),
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(32),
  },
  backButton: {
    marginRight: normalize(16),
  },
  backButtonText: {
    ...typography.heading,
    color: Colors.Citrus,
  },
  formContainer: {
    marginBottom: normalize(32),
  },
});
