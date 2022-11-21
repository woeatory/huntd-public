import React, { memo, useMemo } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import {
  OfferStatus,
  ProfileConnectionInitiator,
  ProfileConnectionStatus,
  useProfileConnectionMetaQuery,
} from '@/controllers/graphql/generated';
import { getChatUserMeta } from '@/controllers/buddyChat/buddyChat.utils/getChatUserMeta';
import { ProfileConnectionRequestHandler } from '@/components/ChatsModule/ChatActions/ProfileConnectionRequestHandler';
import { ProfileConnectionOfferHandler } from '@/components/ChatsModule/ChatActions/ProfileConnectionOfferHandler';
import { IconDotsVertical } from '@/ui/icons/general/IconDotsVertical';
import { ChatActionsTitle } from '@/components/ChatsModule/ChatActions/ChatActionsTitle/ChatActionsTitle';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import styles from './ChatActions.module.scss';

const ConfirmModal = dynamic(
  async () => {
    const mod = await import('@/components/Base/ConfirmModal/ConfirmModal');

    return mod.ConfirmModal;
  },
  {
    ssr: false,
  },
);

interface Props {
  profileConnectionId: number;
}

export const ChatActions = memo<Props>((props) => {
  const { data } = useProfileConnectionMetaQuery({
    variables: {
      profileConnectionId: props.profileConnectionId,
    },
    ssr: false,
  });

  const profile = data?.profileConnection?.candidateProfile ?? null;

  const reviewHandlerMeta = useMemo(() => {
    if (!data?.profileConnection) {
      return {
        shouldRender: false,
      };
    }

    const { type } = getChatUserMeta(data.profileConnection);

    const { initiator, status } = data.profileConnection;

    const shouldRender = type === ProfileConnectionInitiator.Candidate
      && type !== initiator
      && status === ProfileConnectionStatus.Pending;

    return {
      shouldRender,
    };
  }, [data?.profileConnection]);

  const { setShouldReviewHandlerRender } = useBuddyChatContext();

  setShouldReviewHandlerRender(reviewHandlerMeta.shouldRender);

  const offerHandlerMeta = useMemo(() => {
    if (!data?.profileConnection) {
      return {
        shouldRender: false,
        type: ProfileConnectionInitiator.Recruiter,
      };
    }

    const { type } = getChatUserMeta(data.profileConnection);

    if (type === ProfileConnectionInitiator.Recruiter) {
      return {
        shouldRender: !data.profileConnection.recruiterReportedStatus,
        type,
      };
    }

    const shouldRender = (
      !data.profileConnection.recruiterReportedStatus
      || data.profileConnection.recruiterReportedStatus === OfferStatus.Offer
    )
      && !data.profileConnection.candidateReportedStatus
      && !reviewHandlerMeta.shouldRender;

    return {
      shouldRender,
      type,
    };
  }, [data?.profileConnection, reviewHandlerMeta]);

  return (
    <>
      <span
        className={styles.chatActions}
      >
        <div className={styles.mainContainer}>
          <div className={styles.actionsContainer}>
            <ChatActionsTitle
              profileType={offerHandlerMeta.type}
              isConnectionPending={reviewHandlerMeta.shouldRender}
              hasNoOffer={offerHandlerMeta.shouldRender}
            />

            {(reviewHandlerMeta.shouldRender || offerHandlerMeta.shouldRender)
          && (
            <>
              <IconDotsVertical
                className={cn({
                  [styles.actionsListHidden]: (
                    !offerHandlerMeta.shouldRender
                    && reviewHandlerMeta.shouldRender
                  ),
                })}
              />

              <ul className={styles.actionsList}>
                {reviewHandlerMeta.shouldRender && (
                  <li className={cn(
                    styles.actionsListItem, styles.openContactsItem,
                  )}
                  >
                    <ProfileConnectionRequestHandler
                      className={styles.actionItem}
                      profile={profile}
                      profileConnectionId={props.profileConnectionId}
                    />
                  </li>
                )}

                {offerHandlerMeta.shouldRender && (
                  <li className={styles.actionsListItem}>
                    <ProfileConnectionOfferHandler
                      className={styles.actionItem}
                      type={offerHandlerMeta.type}
                      profileConnectionId={props.profileConnectionId}
                    />
                  </li>
                )}
              </ul>
            </>
          )}
          </div>
        </div>
      </span>

      <ConfirmModal />
    </>
  );
});
