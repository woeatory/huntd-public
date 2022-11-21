import React, {
  FC, useState,
  useMemo, useCallback,
} from 'react';
import NoSSR from 'react-no-ssr';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import {
  OfferStatus, useAuthUserConnectionsQuery,
  useBulkReportOfferStatusMutation, ReportOfferStatusValues,
  AuthUserConnectionsDocument,
  ProfileConnection,
} from '@/controllers/graphql/generated';
import typography from '@/ui/typography/typography.module.scss';
import { Button } from '@/ui/buttons/Button';
import { analytics } from '@/controllers/analytics/analytics.client';
import styles from './Connections.module.scss';
import { ConnectionsList, ListModes } from './ConnectionsList/ConnectionsList';

interface SplittedConnections {
  noStatusConnections: ProfileConnection[]
  historyConnections: ProfileConnection[]
}

export const Connections: FC = () => {
  const { t } = useTranslation([Namespaces.Profile]);
  const [
    updatedConnections,
    setUpdatedConnections,
  ] = useState<Map<number, OfferStatus>>(new Map());
  const { data, loading: connectionsLoading } = useAuthUserConnectionsQuery();
  const [
    mutate, { loading: mutationLoading },
  ] = useBulkReportOfferStatusMutation();

  const loading = connectionsLoading || mutationLoading;

  const {
    noStatusConnections,
    historyConnections,
  } = useMemo<SplittedConnections>(
    () => {
      const noStatus: ProfileConnection[] = [];
      const history: ProfileConnection[] = [];

      data?.authUser?.profileConnections?.forEach((el) => {
        if (el.recruiterReportedStatus) {
          history.push(el);
        } else {
          noStatus.push(el);
        }
      });

      return {
        noStatusConnections: noStatus,
        historyConnections: history,
      };
    },
    [data],
  );

  const updateConnectionStatus = useCallback(
    ({ profileConnectionId, status }: ReportOfferStatusValues) => {
      setUpdatedConnections((prev) => {
        const newState = new Map(prev);

        newState.set(profileConnectionId, status);

        return newState;
      });
    },
    [],
  );

  const submitUpdatedConnections = useCallback(
    async () => {
      const values: ReportOfferStatusValues[] = [
        ...updatedConnections.entries(),
      ].map(([profileConnectionId, status]) => ({
        profileConnectionId,
        status,
      }));

      analytics.sendEvent(
        analytics.events.hirings.HiringStatusesSubmitted,
        {
          count: values.length,
        },
      );

      await mutate({
        variables: {
          values,
        },
        refetchQueries: [
          {
            query: AuthUserConnectionsDocument,
            variables: {
              archived: false,
            },
          },
          {
            query: AuthUserConnectionsDocument,
            variables: {
              archived: true,
            },
          },
          { query: AuthUserConnectionsDocument },
        ],
        awaitRefetchQueries: true,
      });

      setUpdatedConnections(new Map());
    },
    [mutate, updatedConnections],
  );

  return (
    <div className="grid-container mt-40">
      <div className="grid-x grid-margin-x">
        <div className='cell large-11'>
          <h2 className={cn(typography.underhead, 'mb-8')}>
            {t(`${Namespaces.Profile}:recruiter_connections_title`)}
          </h2>
          <h3 className={cn(typography.smallText, 'mb-24 c-gray')}>
            {t(`${Namespaces.Profile}:recruiter_connections_subtitle`)}
          </h3>
        </div>

        <ConnectionsList
          updateConnectionStatus={updateConnectionStatus}
          setUpdatedConnections={setUpdatedConnections}
          updatedConnections={updatedConnections}
          connections={noStatusConnections}
          loading={loading}
        />

        <NoSSR>
          <Button
            disabled={!updatedConnections.size || loading}
            className={cn('cell medium-6 large-2 mb-48', styles.submitButton)}
            text={t(`${Namespaces.Profile}:recruiter_connections_submit_button`)}
            onClick={submitUpdatedConnections}
            mode={Button.mode.Primary}
          />
        </NoSSR>

        <ConnectionsList
          mode={ListModes.History}
          updateConnectionStatus={updateConnectionStatus}
          setUpdatedConnections={setUpdatedConnections}
          updatedConnections={updatedConnections}
          connections={historyConnections}
          loading={loading}
        />
      </div>
    </div>
  );
};
