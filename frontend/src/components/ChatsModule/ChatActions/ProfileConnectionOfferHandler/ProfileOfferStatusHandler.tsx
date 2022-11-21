import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import {
  FlashMessageType,
  OfferStatus,
  ProfileConnectionInitiator,
  useReportOfferStatusMutation,
} from '@/controllers/graphql/generated';
import { Button } from '@/ui/buttons/Button';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { useConfirm } from '@/controllers/confirm/confirm.hooks/useConfirm';
import { confirmModalVar } from '@/controllers/confirm/confirm.cache';
import { ReportOfferStatus } from '@/controllers/confirm/confirm.constants';

interface Props {
  profileConnectionId: number;
  type: ProfileConnectionInitiator;
  className: string;
}
export const ProfileConnectionOfferHandler = memo<Props>(
  ({
    profileConnectionId, type, className,
  }) => {
    const [result, setResult] = useState(ReportOfferStatus.NoOffer);
    const { t } = useTranslation([Namespaces.Chat]);

    const [mutate, { loading }] = useReportOfferStatusMutation();

    const flashMessage = useFlashMessage();

    const [confirm] = useConfirm();

    useEffect(() => {
      if (!result) {
        return;
      }

      const modalProps = {
        title: t(`${Namespaces.Chat}:${type}_confirm_report_${result}_title`),
        body: t(`${Namespaces.Chat}:${type}_confirm_report_${result}_body`),
      };

      confirmModalVar({
        ...confirmModalVar(),
        ...modalProps,
      });
    }, [type, result, t]);

    const reportOffer = useCallback(async () => {
      setResult(ReportOfferStatus.Offer);

      if (!await confirm()) {
        return;
      }

      try {
        await mutate({
          variables: {
            profileConnectionId,
            status: OfferStatus.Offer,
          },
        });
      } catch {
        flashMessage.postMessage({
          variables: {
            type: FlashMessageType.Error,
            heading: t(`${Namespaces.Chat}:profile_connection_error`),
            text: t(`${Namespaces.Chat}:report_offer_status_failed`),
          },
        });
      }
    }, [setResult, confirm, mutate, profileConnectionId, flashMessage, t]);

    const reportNoOffer = useCallback(async () => {
      setResult(ReportOfferStatus.NoOffer);

      if (!await confirm()) {
        return;
      }

      try {
        await mutate({
          variables: {
            profileConnectionId,
            status: OfferStatus.NoOffer,
          },
        });
      } catch {
        flashMessage.postMessage({
          variables: {
            type: FlashMessageType.Error,
            heading: t(`${Namespaces.Chat}:profile_connection_error`),
            text: t(`${Namespaces.Chat}:report_offer_status_failed`),
          },
        });
      }
    }, [setResult, confirm, mutate, profileConnectionId, flashMessage, t]);

    return (
      <>
        <Button
          className={className}
          disabled={loading}
          onClick={reportOffer}
          text={t(`${Namespaces.Chat}:${type}_report_status_offer`)}
        />

        <Button
          className={className}
          disabled={loading}
          onClick={reportNoOffer}
          text={t(`${Namespaces.Chat}:${type}_report_status_no_offer`)}
        />
      </>
    );
  },
);
