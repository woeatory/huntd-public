import React, { memo, useCallback, useEffect } from 'react';
import { Button } from '@/ui/buttons/Button';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import {
  CandidateProfile,
  FlashMessageType,
  ProfileConnectionStatus,
  useReviewProfileConnectionRequestMutation,
} from '@/controllers/graphql/generated';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useConfirm } from '@/controllers/confirm/confirm.hooks/useConfirm';
import { confirmModalVar } from '@/controllers/confirm/confirm.cache';

interface Props {
  profile: CandidateProfile | null;
  profileConnectionId: number;
  className: string;
  renderAsButton?: boolean;
  closeOuterModal?: () => void;
}
export const ProfileConnectionRequestHandler = memo<Props>(
  (props) => {
    const {
      profile, profileConnectionId,
      className, renderAsButton,
      closeOuterModal,
    } = props;
    const { t } = useTranslation([Namespaces.Chat]);

    const flashMessage = useFlashMessage();

    const [confirm] = useConfirm();

    const [mutate, { loading }] = useReviewProfileConnectionRequestMutation();

    useEffect(() => {
      const modalProps = {
        title: t(`${Namespaces.Chat}:confirm_open_contacts_title`),
        body: t(`${Namespaces.Chat}:confirm_open_contacts_body`),
      };

      confirmModalVar({
        ...confirmModalVar(),
        ...modalProps,
      });
    }, [t]);

    const approveRequest = useCallback(async () => {
      if (closeOuterModal) {
        closeOuterModal();
      }

      if (!await confirm()) {
        return;
      }

      try {
        await mutate({
          variables: {
            id: profileConnectionId,
            status: ProfileConnectionStatus.Approved,
          },
        });

        if (profile) {
          analytics.sendEvent(
            analytics.events.chatInteraction.CandidateOpenContacts,
            {
              slug: profile.slug,
              salary: profile.salary,
              position: profile.position,
            },
          );
        }
      } catch {
        flashMessage.postMessage({
          variables: {
            type: FlashMessageType.Error,
            heading: t(`${Namespaces.Chat}:profile_connection_error`),
            text: t(`${Namespaces.Chat}:review_request_failed`),
          },
        });
      }
    }, [
      confirm, mutate, profile, profileConnectionId,
      flashMessage, t, closeOuterModal,
    ]);

    return renderAsButton
      ? (
        <Button
          className={className}
          mode={Button.mode.Primary}
          size={closeOuterModal ? Button.size.LargeWide : Button.size.Tiny}
          text={t(`${Namespaces.Chat}:open_contacts`)}
          onClick={approveRequest}
        />
      )
      : (
        <Button
          className={className}
          disabled={loading}
          onClick={approveRequest}
          text={t(`${Namespaces.Chat}:open_contacts`)}
        />
      );
  },
);
