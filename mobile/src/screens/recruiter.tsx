import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { useRecruiterProfileBySlug } from '@/controllers/recruiterProfile/recruiterProfile.hooks/useRecruiterProfileBySlug';
import { ProfileCover } from '@/components/ProfileModule/ProfileCover';
import { BackButton } from '@/components/Header/BackButton';
import { ProfileInfo } from '@/components/ProfileModule/ProfileInfo';
import { RecruiterProfileDetails } from '@/components/ProfileModule/RecruiterProfileDetails';
import { ProfileInfoPlaceholder } from '@/components/ProfileModule/ProfileInfo/ProfileInfoPlaceholder';
import { ProfileDetailsPlaceholder } from '@/components/ProfileModule/CandidateProfileDetails/ProfileDetailsPlaceholder';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks/useLatestRecruiterProfile';
import { RecruiterProfileActions } from '@/components/ProfileModule/ProfileActions/Recruiter/RecruiterProfileActions';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.Recruiter>

export const RecruiterScreen: FC = () => {
  const route = useRoute<RouteProps>();
  const { t } = useTranslation(Namespaces.Profile);

  const [recruiter] = useRecruiterProfileBySlug(route.params.slug);
  const [myProfile] = useLatestRecruiterProfile();

  const isMyProfile = useMemo(
    () => recruiter?.id === myProfile?.id,
    [recruiter?.id, myProfile?.id],
  );

  return (
    <View style={styles.container}>
      <ProfileCover profileStatus={recruiter?.status}>
        <BackButton
          color={Colors.Citrus}
          style={styles.backButton}
          label={t(`${Namespaces.Profile}:profile_preview`)}
        />
        {recruiter ? (
          <ProfileInfo showDetails profile={recruiter} />
        ) : (
          <ProfileInfoPlaceholder showDetails />
        )}
      </ProfileCover>

      {recruiter ? (
        <RecruiterProfileDetails profile={recruiter} />
      ) : (
        <ProfileDetailsPlaceholder />
      )}

      {recruiter && isMyProfile && (
        <RecruiterProfileActions recruiter={recruiter} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
