import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Button } from '@/components/Base/Button';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { useDeactivateCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useDeactivateCandidateProfile';

export const DeactivateProfileAction: FC = () => {
  const { t } = useTranslation([Namespaces.Profile, Namespaces.Common]);
  const [deactivateCandidateProfile] = useDeactivateCandidateProfile();

  const onSubmit = useCallback(async () => {
    await deactivateCandidateProfile();
  }, [deactivateCandidateProfile]);

  const onPress = useCallback(async () => {
    Alert.alert(
      t(`${Namespaces.Common}:danger_action`),
      t(`${Namespaces.Profile}:deactivate_profile_confirmation`),
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: onSubmit,
        },
      ],
    );
  }, [onSubmit, t]);

  return (
    <Button
      type={Button.type.Secondary}
      onPress={onPress}
      title={t(`${Namespaces.Profile}:deactivate_profile`)}
    />
  );
};
