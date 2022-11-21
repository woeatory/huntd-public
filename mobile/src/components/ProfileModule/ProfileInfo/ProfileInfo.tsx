import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  CandidateProfile,
  PrimaryProfile,
  RecruiterProfile,
} from '@/controllers/graphql/generated';
import { ProfileIcon } from '@/ui/icons/general/ProfileIcon';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { useProfileContext } from '@/controllers/profile/profile.context';
import { StackRoutes } from '@/controllers/router/router.constants';
import { ScaleTouchableView } from '@/components/Base/Animation/ScaleTouchableView';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { Image } from '@/components/Base/Image';
import { ProfileInfoStatus } from '@/components/ProfileModule/ProfileInfo/ProfileInfoStatus';

interface Props {
  profile: CandidateProfile | RecruiterProfile;
  showDetails?: boolean;
}

export const ProfileInfo: FC<Props> = (props) => {
  const { profile, showDetails } = props;
  const { profileType } = useProfileContext();

  const navigation = useNavigation();
  const route = useRoute();

  const onPress = useCallback(() => {
    if (
      route.name === StackRoutes.Candidate
        || route.name === StackRoutes.Recruiter
    ) {
      return;
    }

    if (profile.slug) {
      navigation.navigate(
        profileType === PrimaryProfile.Candidate
          ? StackRoutes.Candidate
          : StackRoutes.Recruiter,
        { slug: profile.slug },
      );
    }
  }, [navigation, profile.slug, profileType, route.name]);

  return (
    <ScaleTouchableView onPress={onPress}>
      <View style={[
        styles.profile,
        { marginBottom: showDetails ? 16 : 0 },
      ]}
      >
        <View style={styles.avatar}>
          {profile.user?.avatar
            ? (
              <Image
                src={profile.user.avatar.url}
                size={72}
                borderRadius={72 / 2}
              />
            ) : (
              <ProfileIcon
                width={72}
                height={72}
                color={Colors.Citrus}
              />
            )}
        </View>
        <View>
          <Text style={[styles.text, typography.caption]}>
            {profile.user?.computedName || profile.position}
          </Text>
          <ProfileInfoStatus status={profile.status} />
        </View>
      </View>
      {!!profile.rejectReason && (
        <Text style={styles.rejectReason}>{profile.rejectReason}</Text>
      )}
      {showDetails && (
        <>
          {!!profile.user?.phone && (
            <Text style={[styles.text, typography.text]}>
              {profile.user?.phone}
            </Text>
          )}
          {!!profile.user?.email && (
            <Text style={[styles.text, typography.text]}>
              {profile.user?.email}
            </Text>
          )}
        </>
      )}
    </ScaleTouchableView>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.Semidark,
    marginBottom: 4,
  },
  avatar: {
    marginRight: 16,
  },
  rejectReason: {
    ...typography.text,
    color: Colors.Gray,
    marginTop: 8,
  },
});
