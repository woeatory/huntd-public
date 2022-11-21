import React, {
  Dispatch, FC, SetStateAction, useCallback,
} from 'react';
import cn from 'classnames';
import NoSSR from 'react-no-ssr';
import { OfferStatus, ProfileConnection, ReportOfferStatusValues } from '@/controllers/graphql/generated';
import { Selectors } from '@/lib/selectors';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Button } from '@/ui/buttons/Button';
import styles from './ConnectionsList.module.scss';

interface Props {
  updatedConnections: Map<number, OfferStatus>
  updateConnectionStatus: (values: ReportOfferStatusValues) => void
  connection: ProfileConnection
  setUpdatedConnections: Dispatch<SetStateAction<Map<number, OfferStatus>>>
}

export const StatusButtons: FC<Props> = ({
  updatedConnections, updateConnectionStatus,
  connection, setUpdatedConnections,
}) => {
  const { t } = useTranslation([Namespaces.Profile]);

  const updateStatus = useCallback(
    (status: OfferStatus, connectionId: number) => {
      if (
        updatedConnections
          .get(connectionId) === status
      ) {
        return;
      }

      analytics.sendEvent(
        analytics.events.hirings.HiringStatusChanged,
        {
          status,
        },
      );

      updateConnectionStatus({
        profileConnectionId: connectionId,
        status,
      });
    },
    [updateConnectionStatus, updatedConnections],
  );

  return (
    <div className={styles.buttonsWrapper}>
      <Button
        className={cn(styles.button, styles.button_rejected, {
          [Selectors.Active]: (
            updatedConnections
              .get(connection.id) === OfferStatus.NoOffer
          ),
        })}
        onClick={() => updateStatus(OfferStatus.NoOffer, connection.id)}
        text={t(`${Namespaces.Profile}:connections_no_offer_button`)}
        mode={Button.mode.BorderLess}
      />
      <Button
        className={cn(styles.button, styles.button_hired, {
          [Selectors.Active]: (
            updatedConnections
              .get(connection.id) === OfferStatus.Offer
          ),
        })}
        onClick={() => updateStatus(OfferStatus.Offer, connection.id)}
        text={t(`${Namespaces.Profile}:connections_offer_button`)}
        mode={Button.mode.BorderLess}
      />
      <NoSSR>
        <Button
          className={cn(
            styles.button, styles.button_in_progress,
            {
              [Selectors.Active]: (
                !updatedConnections.get(connection.id)
              ),
            },
          )}
          onClick={() => {
            if (!updatedConnections.get(connection.id)) {
              return;
            }

            setUpdatedConnections((prev) => {
              const map = new Map(prev);

              map.delete(connection.id);

              return map;
            });
          }}
          text={t(`${Namespaces.Profile}:connections_in_progress_button`)}
          mode={Button.mode.BorderLess}
        />
      </NoSSR>
    </div>
  );
};
