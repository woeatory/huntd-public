import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { Button } from '@/components/Base/Button';
import { useSendCandidateProfileToReview } from '@/controllers/candidateProfile/candidateProfile.hooks/useSendCandidateProfileToReview';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';

export const SendToModerationAction: FC = () => {
  const { t } = useTranslation([Namespaces.Profile]);
  const logger = useLogger({ name: 'Send candidate profile to review' });
  const [sendCandidateProfileToReview] = useSendCandidateProfileToReview();

  const onPress = useCallback(async () => {
    try {
      await sendCandidateProfileToReview();

      AnalyticsClient.logEvent(
        AnalyticsEvents.userProfile.SendProfileToModeration,
        { profile: 'Candidate' },
      );
    } catch (error) {
      Alert.alert(
        t(`${Namespaces.Profile}:${error.message}_title`),
        t(`${Namespaces.Profile}:${error.message}_description`),
      );

      logger.error(error);
    }
  }, [logger, sendCandidateProfileToReview, t]);

  return (
    <Button
      type={Button.type.Primary}
      onPress={onPress}
      title={t(`${Namespaces.Profile}:send_and_post`)}
    />
  );
};
