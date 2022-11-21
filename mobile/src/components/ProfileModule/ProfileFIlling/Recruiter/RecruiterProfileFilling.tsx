import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { CompanyDetailsHeader } from '@/components/ProfileModule/ProfileFIlling/Recruiter/components/CompanyDetailsHeader';
import { CompanyDetailsForm } from '@/components/ProfileModule/ProfileFIlling/Recruiter/components/CompanyDetailsForm';
import { Spacer } from '@/components/Base/Spacer';

export const RecruiterProfileFilling: FC = () => (
  <View style={styles.container}>
    <CompanyDetailsHeader />
    <Spacer height={48} />
    <CompanyDetailsForm />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
});
