import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useProfileContext } from '@/controllers/profile/profile.context';
import { ProfileOption } from '@/components/ProfileModule/ProfileSelector/ProfileOption';
import { PrimaryProfile } from '@/controllers/graphql/generated';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks/useLatestRecruiterProfile';

interface Props {
  closeModal: () => void;
}

export const ProfileSelector: FC<Props> = (props) => {
  const { closeModal } = props;

  const [candidate] = useLatestCandidateProfile();
  const [recruiter] = useLatestRecruiterProfile();

  const { setProfileType } = useProfileContext();

  const changeProfileType = useCallback(
    (type: PrimaryProfile) => {
      setProfileType(type);
      closeModal();
    },
    [closeModal, setProfileType],
  );

  return (
    <View style={styles.container}>
      <ProfileOption
        available={Boolean(candidate)}
        type={PrimaryProfile.Candidate}
        onPress={changeProfileType}
      />
      <ProfileOption
        available={Boolean(recruiter)}
        type={PrimaryProfile.Recruiter}
        onPress={changeProfileType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 34,
    paddingHorizontal: 20,
  },
});
