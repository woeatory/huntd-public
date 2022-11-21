import React, { FC } from 'react';
import { ProfileConnectionInitiator } from '@/controllers/graphql/generated';
import { IconEyeOn } from '@/ui/icons/general/IconEyeOn';
import { IconEyeOff } from '@/ui/icons/general/IconEyeOff';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import styles from './ChatActionsTitle.module.scss';

interface Props {
  profileType: ProfileConnectionInitiator;
  isConnectionPending: boolean;
  hasNoOffer: boolean;
}
export const ChatActionsTitle: FC<Props> = (props) => {
  const {
    profileType,
    isConnectionPending,
    hasNoOffer,
  } = props;

  const { t } = useTranslation([Namespaces.Chat]);

  const isCandidateProfile = (
    profileType === ProfileConnectionInitiator.Candidate
  );

  const renderCandidateChatActions = () => {
    if (isConnectionPending) {
      return (
        <>
          <IconEyeOff />
          <span className={styles.chatActionsTitle}>
            {t(`${Namespaces.Chat}:my_contacts_hidden`)}
          </span>
        </>
      );
    }

    return (
      <>
        <IconEyeOn />
        <span className={styles.chatActionsTitle}>
          {t(`${Namespaces.Chat}:contacts_opened`)}
        </span>
      </>
    );
  };

  const renderRecruiterChatActions = () => {
    if (hasNoOffer) {
      return (
        <span className={styles.chatActionsTitle}>{t(`${Namespaces.Chat}:offer_menu`)}</span>
      );
    }

    return null;
  };

  return (
    <>
      {isCandidateProfile
        ? (
          <>
            {renderCandidateChatActions()}
          </>
        )
        : (
          <>
            {renderRecruiterChatActions()}
          </>
        )}
    </>
  );
};
