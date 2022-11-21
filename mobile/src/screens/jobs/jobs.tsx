import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { GlobalStyles } from '@/ui/theme/globalStyles';
import { JobsModule } from '@/components/Jobs';

export const JobsScreen: FC = () => (
  <SafeAreaView style={GlobalStyles.safeAreaView}>
    <JobsModule />
  </SafeAreaView>
);
