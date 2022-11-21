import React, { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import { OfferStatus, ProfileConnection, ReportOfferStatusValues } from '@/controllers/graphql/generated';
import typography from '@/ui/typography/typography.module.scss';
import { Selectors } from '@/lib/selectors';
import { createLink } from '@/controllers/buddyChat/buddyChat.utils/createLink';
import { Image } from '@/components/Base/Image/Image';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Loader } from '@/ui/Loader';
import { IconLockLocked } from '@/ui/icons/general/IconLockLocked';
import { TimeAgoModes, TimeAgoModule } from '@/components/Base/TimeAgoModule/TimeAgoModule';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { Button } from '@/ui/buttons/Button';
import { IconClose } from '@/ui/icons/general/IconClose';
import { analytics } from '@/controllers/analytics/analytics.client';
import { IconChat } from '@/ui/icons/general/IconChat';
import styles from './ConnectionsList.module.scss';
import { StatusButtons } from './StatusButtons';

export enum ListModes {
  History = 'history',
  Hires = 'hires'
}

interface Props {
  connections: ProfileConnection[]
  loading: boolean
  updatedConnections: Map<number, OfferStatus>
  setUpdatedConnections: Dispatch<SetStateAction<Map<number, OfferStatus>>>
  updateConnectionStatus: (values: ReportOfferStatusValues) => void
  mode?: ListModes
}

export const ConnectionsList: FC<Props> = ({
  connections, loading, updateConnectionStatus,
  updatedConnections, setUpdatedConnections,
  mode,
}) => {
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <>
      <Loader active={loading} />
      <table className={cn(styles.table, 'cell large-11 c-gray')}>
        {!mode && (
          <thead>
            <tr className={cn(styles.headRow, typography.overheadRegular, 'mb-12')}>
              <th className={styles.tableCell}>
                {t(`${Namespaces.Profile}:connections_candidate_heading`)}
              </th>
              <th className={styles.tableCell}>
                {t(`${Namespaces.Profile}:connections_last_message_heading`)}
              </th>
              <th className={styles.tableCell}>
                {t(`${Namespaces.Profile}:connections_salary_heading`)}
              </th>
              <th className={styles.tableCell}>
                {t(`${Namespaces.Profile}:connections_comission_heading`)}
              </th>
              <th className={styles.tableCell}>
                {t(`${Namespaces.Profile}:connections_status_heading`)}
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {connections.map((connection) => {
            const lastRecruiterTime = new Date(
              connection.userMeta?.lastActionTime ?? 0,
            ).getTime();
            const lastCandidateTime = new Date(
              connection.buddyMeta?.lastActionTime ?? 0,
            ).getTime();
            const lastMessageDate = Math.max(
              lastRecruiterTime,
              lastCandidateTime,
            );

            return (
              <tr
                key={connection.id}
                className={cn(styles.tableRow, typography.smallText)}
              >
                <td className={cn(styles.tableCell, styles.buddyCell)}>
                  <div className={cn(styles.buddyAvatar, {
                    [Selectors.Accent]: !connection.candidateUser?.avatar,
                  })}
                  >
                    {connection.candidateUser?.avatar
                      ? (
                        <Image
                          width={48}
                          height={48}
                          src={connection.candidateUser?.avatar?.url}
                        />
                      )
                      : <IconLockLocked />}
                  </div>
                  <div className={styles.buddyInfoContainer}>
                    <div className={styles.buddyInfo}>
                      <div className={styles.buddyText}>
                        <span className={cn(styles.buddyName, typography.smallCaption, 'c-semidark-chocolate')}>
                          {connection.candidateUser?.computedName ?? (
                            t(`${Namespaces.Profile}:connections_closed_contacts_title`)
                            )}
                        </span>

                        <span
                          className={cn(
                            styles.buddyPosition, typography.smallText,
                          )}
                        >
                          {connection.candidateProfile.position}
                        </span>
                      </div>
                    </div>
                    <Button
                      rel='noreferrer'
                      target='_blank'
                      className={styles.chatButton}
                      onClick={() => {
                        analytics.sendEvent(
                          analytics.events.hirings.HiringStatusCandidateClicked,
                          {},
                        );
                      }}
                      href={createLink(
                        connection.id,
                        connection.candidateProfile.slug ?? '',
                      )}
                      LeftIcon={IconChat}
                    />
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={cn(
                    typography.overheadRegular,
                    styles.mobileLabel,
                  )}
                  >
                    {t(`${Namespaces.Profile}:connections_last_message_heading`)}
                  </span>
                  <TimeAgoModule
                    mode={TimeAgoModes.AbsoluteTime}
                    lastActionTime={new Date(lastMessageDate).toUTCString()}
                  />
                </td>
                <td className={styles.tableCell}>
                  <span className={cn(
                    typography.overheadRegular,
                    styles.mobileLabel,
                  )}
                  >
                    {t(`${Namespaces.Profile}:connections_salary_heading`)}
                  </span>
                  <span>
                    {Math.ceil(connection.candidateProfile.salary ?? 0) * 12}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  <span className={cn(
                    typography.overheadRegular,
                    styles.mobileLabel,
                  )}
                  >
                    {t(`${Namespaces.Profile}:connections_comission_heading`)}
                  </span>
                  <span>
                    {Math.ceil(connection?.candidateProfile?.salary ?? 0)}
                  </span>
                </td>
                <td className={cn(styles.tableCell, {
                  [styles.tableCell_history]: (
                    connection.recruiterReportedStatus
                  ),
                  [Selectors.Active]: (
                    connection.recruiterReportedStatus === OfferStatus.Offer
                    || connection.candidateReportedStatus === OfferStatus.Offer
                  ),
                })}
                >
                  {connection.recruiterReportedStatus
                    ? (
                      <p className={cn(
                        styles.historyConnectionStatus,
                        typography.overhead,
                      )}
                      >
                        {connection
                          .recruiterReportedStatus === OfferStatus.Offer
                          ? <IconCheck />
                          : <IconClose />}
                        {t(`${Namespaces.Profile}:history_connection_status_${connection.recruiterReportedStatus}`)}
                      </p>
                    )
                    : (
                      <StatusButtons
                        updatedConnections={updatedConnections}
                        setUpdatedConnections={setUpdatedConnections}
                        updateConnectionStatus={updateConnectionStatus}
                        connection={connection}
                      />
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
