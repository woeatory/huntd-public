import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/ui/theme/colors';
import { CandidateProfileStatus, RecruiterProfileStatus } from '@/controllers/graphql/generated';
import { normalize } from '@/ui/theme/normalize';

interface Props {
  profileStatus?: CandidateProfileStatus | RecruiterProfileStatus;
}

export const ProfileCover: FC<Props> = (props) => {
  const { children, profileStatus } = props;

  const gradientColors = profileStatus === RecruiterProfileStatus.Active
    ? [Colors.Peach, Colors.Sky]
    : [Colors.LightGray, Colors.LightPeach];

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(40),
    paddingBottom: normalize(20),
    paddingHorizontal: 20,
  },
});
