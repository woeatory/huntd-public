import React, { FC, useCallback } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Colors } from '@/ui/theme/colors';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { PrimaryProfile } from '@/controllers/graphql/generated';
import { CandidateProfileFilling } from '@/components/ProfileModule/ProfileFIlling/Candidate';
import { RecruiterProfileFilling } from '@/components/ProfileModule/ProfileFIlling/Recruiter';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ProfileFilling>

export const ProfileFillingScreen: FC = () => {
  const { params } = useRoute<RouteProps>();
  const { type } = params;

  const renderProfileComponent = useCallback(() => {
    switch (type) {
      case PrimaryProfile.Candidate:
        return <CandidateProfileFilling />;

      case PrimaryProfile.Recruiter:
        return <RecruiterProfileFilling />;

      default:
        return null;
    }
  }, [type]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {renderProfileComponent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
