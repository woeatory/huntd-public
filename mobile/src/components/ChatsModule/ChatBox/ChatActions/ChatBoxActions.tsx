import React, { FC, useCallback, useMemo } from 'react';
import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { normalize } from '@/ui/theme/normalize';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { useShareContacts } from '@/controllers/candidateProfile/candidateProfile.hooks/useShareContacts';
import {
  ProfileConnection,
  ProfileConnectionInitiator,
  ProfileConnectionStatus,
} from '@/controllers/graphql/generated';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { getChatUserMeta } from '@/controllers/chat/chat.utils/getChatUserMeta';

interface Props {
  profileConnection: ProfileConnection;
  profileConnectionId: number;
  closeModal: () => void;
}

export const ChatBoxActions: FC<Props> = (props) => {
  const { profileConnectionId, profileConnection, closeModal } = props;
  const { t } = useTranslation([Namespaces.Chat]);

  const [shareContacts] = useShareContacts();

  const shouldRenderShareContacts = useMemo(() => {
    const { type } = getChatUserMeta(profileConnection);
    const { initiator, status } = profileConnection;

    return type === ProfileConnectionInitiator.Candidate
      && type !== initiator
      && status === ProfileConnectionStatus.Pending;
  }, [profileConnection]);

  const shareContactsCallback = useCallback(async () => {
    await shareContacts(profileConnectionId);

    AnalyticsClient.logEvent(
      AnalyticsEvents.chatInteraction.CandidateOpenContacts,
      {
        slug: profileConnection.candidateProfile.slug,
        salary: profileConnection.candidateProfile.salary,
        position: profileConnection.candidateProfile.position,
      },
    );

    closeModal();
  }, [closeModal, profileConnection, profileConnectionId, shareContacts]);

  return (
    <View style={styles.container}>
      {shouldRenderShareContacts && (
        <View style={styles.actionView}>
          <TouchableWithoutFeedback onPress={shareContactsCallback}>
            <Text style={[styles.actionText, styles.firstAction]}>
              {t(`${Namespaces.Chat}:open_contacts`)}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(28),
    paddingBottom: normalize(24),
    paddingHorizontal: normalize(20),
  },
  actionView: {
    marginBottom: normalize(20),
  },
  actionText: {
    ...typography.text,
    fontSize: normalize(14),
  },
  firstAction: {
    color: Colors.Citrus,
  },
});
