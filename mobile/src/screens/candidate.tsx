import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { useCandidateProfileBySlug } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileBySlug';
import { ProfileCover } from '@/components/ProfileModule/ProfileCover';
import { BackButton } from '@/components/Header/BackButton';
import { ProfileInfo } from '@/components/ProfileModule/ProfileInfo';
import { CandidateProfileDetails } from '@/components/ProfileModule/CandidateProfileDetails';
import { ProfileInfoPlaceholder } from '@/components/ProfileModule/ProfileInfo/ProfileInfoPlaceholder';
import { ProfileDetailsPlaceholder } from '@/components/ProfileModule/CandidateProfileDetails/ProfileDetailsPlaceholder';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { CandidateProfileActions } from '@/components/ProfileModule/ProfileActions/Candidate/CandidateProfileActions';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.Candidate>;

export const CandidateScreen: FC = () => {
  const route = useRoute<RouteProps>();
  const { t } = useTranslation(Namespaces.Profile);

  const [candidate] = useCandidateProfileBySlug(route.params.slug);
  const [myCandidate] = useLatestCandidateProfile();

  const isMyProfile = useMemo(
    () => candidate?.id === myCandidate?.id,
    [candidate?.id, myCandidate?.id],
  );

  return (
    <View style={styles.container}>
      <ProfileCover profileStatus={candidate?.status}>
        <BackButton
          color={Colors.Citrus}
          style={styles.backButton}
          label={t(`${Namespaces.Profile}:profile_preview`)}
        />
        {candidate ? (
          <ProfileInfo showDetails profile={candidate} />
        ) : (
          <ProfileInfoPlaceholder showDetails />
        )}
      </ProfileCover>

      {candidate ? (
        <CandidateProfileDetails profile={candidate} />
      ) : (
        <ProfileDetailsPlaceholder />
      )}

      {candidate && isMyProfile && (
        <CandidateProfileActions candidate={candidate} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
