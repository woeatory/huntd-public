import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSendRecruiterProfileToReview } from '@/controllers/recruiterProfile/recruiterProfile.hooks/useSendRecruiterProfileToReview';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { Button } from '@/components/Base/Button';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

export const SendRecruiterToModeration: FC = () => {
  const logger = useLogger({ name: 'Send recruiter profile to review' });
  const { t } = useTranslation([Namespaces.Profile]);
  const [sendToReview] = useSendRecruiterProfileToReview();

  const onPress = useCallback(async () => {
    try {
      await sendToReview();

      AnalyticsClient.logEvent(
        AnalyticsEvents.userProfile.SendProfileToModeration,
        { profile: 'Recruiter' },
      );
    } catch (error) {
      logger.error(error);
    }
  }, [logger, sendToReview]);

  return (
    <Button
      type={Button.type.Primary}
      onPress={onPress}
      title={t(`${Namespaces.Profile}:send_and_post`)}
    />
  );
};
