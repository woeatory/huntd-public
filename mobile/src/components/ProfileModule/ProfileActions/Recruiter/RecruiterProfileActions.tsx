import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { RecruiterProfile, RecruiterProfileStatus } from '@/controllers/graphql/generated';
import { SendRecruiterToModeration } from '@/components/ProfileModule/ProfileActions/Recruiter/components/SendRecruiterToModeration';
import { normalize } from '@/ui/theme/normalize';

interface Props {
  recruiter: RecruiterProfile;
}

export const RecruiterProfileActions: FC<Props> = (props) => {
  const { recruiter } = props;

  const shouldRenderSendToModeration = useMemo(() => {
    const statuses = [
      RecruiterProfileStatus.Rejected,
      RecruiterProfileStatus.Inactive,
      RecruiterProfileStatus.Draft,
    ];

    return statuses.includes(recruiter.status);
  }, [recruiter]);

  return (
    <View style={styles.container}>
      {shouldRenderSendToModeration && (
        <View style={styles.action}>
          <SendRecruiterToModeration />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: normalize(20),
    width: '100%',
  },
  action: {
    marginBottom: 12,
  },
});
