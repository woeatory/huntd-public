import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChatAction, ChatActionType } from '@/components/ChatsModule/ChatBox/ChatActions/ChatAction';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import {
  CandidateProfile,
  ProfileConnectionStatus,
  useReviewProfileConnectionRequestMutation,
} from '@/controllers/graphql/generated';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';

interface Props {
  profile: CandidateProfile | null;
  profileConnectionId: number;
}

export const OpenContacts: FC<Props> = (props) => {
  const { profileConnectionId, profile } = props;

  const { t } = useTranslation([Namespaces.Chat]);
  const [
    reviewConnection,
    { loading },
  ] = useReviewProfileConnectionRequestMutation();

  const handleOpenContacts = useCallback(async () => {
    try {
      await reviewConnection({
        variables: {
          id: profileConnectionId,
          status: ProfileConnectionStatus.Approved,
        },
      });

      if (profile) {
        AnalyticsClient.logEvent(
          AnalyticsEvents.chatInteraction.CandidateOpenContacts,
          {
            slug: profile.slug,
            salary: profile.salary,
            position: profile.position,
          },
        );
      }
    } catch {
      // DO NOTHING
    }
  }, [profile, profileConnectionId, reviewConnection]);

  return (
    <ChatAction
      type={ChatActionType.Primary}
      title={t(`${Namespaces.Chat}:open_contacts`)}
      onPress={handleOpenContacts}
      disabled={loading}
    />
  );
};
