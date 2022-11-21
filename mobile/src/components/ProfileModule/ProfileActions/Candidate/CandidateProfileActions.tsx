import React, { FC, useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { CandidateProfile, CandidateProfileStatus } from '@/controllers/graphql/generated';
import { DeactivateProfileAction } from '@/components/ProfileModule/ProfileActions/Candidate/components/DeactivateProfileAction';
import { SendToModerationAction } from '@/components/ProfileModule/ProfileActions/Candidate/components/SendToModerationAction';
import { EditProfile } from '@/components/ProfileModule/ProfileActions/Candidate/components/EditProfile';
import { isCandidateProfileFilled } from '@/controllers/candidateProfile/candidateProfile.utils/getCandidateProfileFillingStep';
import { normalize } from '@/ui/theme/normalize';

interface Props {
  candidate: CandidateProfile;
}

export const CandidateProfileActions: FC<Props> = (props) => {
  const { candidate } = props;
  const { width } = useWindowDimensions();

  const shouldRenderSendToModerationAction = useMemo(() => {
    if (candidate.status === CandidateProfileStatus.Rejected) {
      return true;
    }

    if (candidate.status === CandidateProfileStatus.Inactive) {
      return true;
    }

    const candidateProfileFilled = (
      isCandidateProfileFilled(candidate)
    );

    const candidateProfileInDraft = (
      candidate.status === CandidateProfileStatus.Draft
    );

    return candidateProfileFilled && candidateProfileInDraft;
  }, [candidate]);

  return (
    <View style={[styles.container, { width }]}>
      {candidate.status === CandidateProfileStatus.Active && (
        <View style={styles.action}>
          <DeactivateProfileAction />
        </View>
      )}

      {shouldRenderSendToModerationAction && (
        <View style={styles.action}>
          <SendToModerationAction />
        </View>
      )}

      <View style={styles.action}>
        <EditProfile />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: normalize(20),
  },
  action: {
    marginBottom: 12,
  },
});
