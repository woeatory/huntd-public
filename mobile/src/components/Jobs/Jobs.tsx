import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { JobsHeader } from '@/components/Jobs/components/JobsHeader';
import { normalize } from '@/ui/theme/normalize';

export const JobsModule: FC = () => (
  <View style={styles.container}>
    <JobsHeader />
    <Text>
      To be implemented
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(20, 'height'),
    paddingHorizontal: normalize(20),
  },
});
