import React, { FC, useEffect, useMemo } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { ProfileMenu } from '@/components/ProfileModule/ProfileMenu';
import { ProfileSelector } from '@/components/ProfileModule/ProfileSelector';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useProfileContext } from '@/controllers/profile/profile.context';
import { ProfileCover } from '@/components/ProfileModule/ProfileCover';
import { typography } from '@/ui/typography/typography.module';
import { ChevronDown } from '@/ui/icons/general/ChevronDown';
import { Colors } from '@/ui/theme/colors';
import { ProfileInfo } from '@/components/ProfileModule/ProfileInfo';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks/useLatestRecruiterProfile';
import { PrimaryProfile } from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { ProfileInfoPlaceholder } from '@/components/ProfileModule/ProfileInfo/ProfileInfoPlaceholder';
import { SignOut } from '@/components/Authentication/SignOut';
import { useModal } from '@/controllers/app/app.hooks/useModal';
import { BottomModal } from '@/components/BottomModal';

export const ProfileModule: FC = () => {
  const { modalRef, closeModal, openModal } = useModal();
  const { t } = useTranslation([Namespaces.Profile]);

  const [user] = useAuthUser();
  const { profileType, setProfileType } = useProfileContext();

  const [candidate] = useLatestCandidateProfile();
  const [recruiter] = useLatestRecruiterProfile();

  const profile = useMemo(() => {
    switch (profileType) {
      case PrimaryProfile.Candidate:
        return candidate;

      case PrimaryProfile.Recruiter:
        return recruiter;

      default:
        return null;
    }
  }, [candidate, profileType, recruiter]);

  useEffect(() => {
    if (!user?.primaryProfile) {
      return;
    }

    if (profileType === PrimaryProfile.NotDefined) {
      setProfileType(user.primaryProfile);
    }
  }, [profileType, setProfileType, user]);

  return (
    <>
      <ProfileCover profileStatus={profile?.status}>
        <TouchableOpacity style={styles.role} onPress={openModal}>
          <Text style={[styles.text, typography.heading]}>
            {t(`${Namespaces.Profile}:${profileType.toLowerCase()}_profile_link`)}
          </Text>
          <ChevronDown color={Colors.Semidark} />
        </TouchableOpacity>
        {profile ? (
          <ProfileInfo profile={profile} />
        ) : (
          <ProfileInfoPlaceholder />
        )}
      </ProfileCover>
      {profile?.slug && (
        <ProfileMenu profileSlug={profile.slug} />
      )}
      <View style={styles.block}>
        <SignOut />
      </View>
      <BottomModal portal modalRef={modalRef}>
        <ProfileSelector closeModal={closeModal} />
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  role: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  block: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  text: {
    color: Colors.Semidark,
    marginRight: 4,
  },
});
