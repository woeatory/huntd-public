import React, { FC } from 'react';
import {
  SafeAreaView, StyleSheet, Text, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { typography } from '@/ui/typography/typography.module';
import { ProfileLink } from '@/components/ProfileModule/NoProfiles/ProfileLink';
import { PrimaryProfile } from '@/controllers/graphql/generated';
import { SignOut } from '@/components/Authentication/SignOut';
import { GlobalStyles } from '@/ui/theme/globalStyles';

export const NoProfiles: FC = () => {
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <SafeAreaView style={GlobalStyles.safeAreaView}>
      <View style={styles.container}>
        <View style={{ marginBottom: 24 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={[typography.heading]}>
              {t(`${Namespaces.Profile}:i_am`)}
            </Text>
          </View>
        </View>

        <ProfileLink profileType={PrimaryProfile.Candidate} />
        <ProfileLink profileType={PrimaryProfile.Recruiter} />

        <SignOut />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
