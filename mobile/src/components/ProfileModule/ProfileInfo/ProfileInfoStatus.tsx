import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CandidateProfileStatus, RecruiterProfileStatus } from '@/controllers/graphql/generated';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';

interface Props {
  status: CandidateProfileStatus | RecruiterProfileStatus;
}

export const ProfileInfoStatus: FC<Props> = (props) => {
  const { status } = props;

  const { t } = useTranslation([Namespaces.Profile]);

  const statusColor = useMemo(() => {
    switch (status) {
      case CandidateProfileStatus.Active:
        return [Colors.Success, Colors.Semidark];

      case CandidateProfileStatus.Rejected:
        return [Colors.Peach, Colors.Error];

      default:
        return [Colors.LightGray, Colors.Semidark];
    }
  }, [status]);

  const [backgroundColor, color] = statusColor;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>
        {t(`${Namespaces.Profile}:profile_status_${status}`)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    ...typography.smallCaption,
    textTransform: 'uppercase',
  },
});
