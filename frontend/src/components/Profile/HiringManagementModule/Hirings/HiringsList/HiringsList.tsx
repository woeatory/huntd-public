import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { ProfileConnection, useSendPaymentRequestMutation } from '@/controllers/graphql/generated';
import typography from '@/ui/typography/typography.module.scss';
import { Selectors } from '@/lib/selectors';
import { createLink } from '@/controllers/buddyChat/buddyChat.utils/createLink';
import { Image } from '@/components/Base/Image/Image';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Loader } from '@/ui/Loader';
import { IconLockLocked } from '@/ui/icons/general/IconLockLocked';
import { analytics } from '@/controllers/analytics/analytics.client';
import { Button } from '@/ui/buttons/Button';
import { TimeAgoModes, TimeAgoModule } from '@/components/Base/TimeAgoModule/TimeAgoModule';
import { IconChat } from '@/ui/icons/general/IconChat';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import styles from '@/components/Profile/HiringManagementModule/Connections/ConnectionsList/ConnectionsList.module.scss';
import { IconCircle } from '@/ui/icons/general/IconCircle';
import hiringStyles from './HiringsList.module.scss';

interface Props {
  hires: ProfileConnection[]
  loading: boolean
}

export const HiringsList: FC<Props> = ({
  hires, loading,
}) => {
  const { t } = useTranslation([Namespaces.Profile]);
  const [sendPaymentRequest] = useSendPaymentRequestMutation();

  const clickHandler = useCallback(
    async (connection: ProfileConnection) => {
      await sendPaymentRequest({
        variables: {
          profileConnectionId: connection.id,
          paymentAmount: Math.ceil(
            connection.candidateProfile.salary ?? 0,
          ),
          candidateSlug: connection.candidateProfile.slug ?? '',
        },
      });

      analytics.sendEvent(
        analytics.events.hirings.PaymentRequested,
        {
          amount: connection.candidateProfile.salary ?? 0,
        },
      );
    },
    [sendPaymentRequest],
  );

  return (
    <>
      <Loader active={loading} />
      <table className={cn(styles.table, 'cell large-11 c-gray')}>

        <thead>
          <tr className={cn(styles.headRow, typography.overheadRegular, 'mb-12')}>
            <th className={styles.tableCell}>
              {t(`${Namespaces.Profile}:connections_candidate_heading`)}
            </th>
            <th className={styles.tableCell}>
              {t(`${Namespaces.Profile}:hirings_hiring_day`)}
            </th>
            <th className={styles.tableCell}>
              {t(`${Namespaces.Profile}:connections_salary_heading`)}
            </th>
            <th className={styles.tableCell}>
              {t(`${Namespaces.Profile}:connections_comission_heading`)}
            </th>
            <th className={styles.tableCell}>
              {t(`${Namespaces.Profile}:hirings_status_heading`)}
            </th>
          </tr>
        </thead>
        <tbody>
          {hires.map((connection) => {
            const lastRecruiterTime = new Date(
              connection.recruiterReportedAt ?? 0,
            ).getTime();
            const lastCandidateTime = new Date(
              connection.candidateReportedAt ?? 0,
            ).getTime();
            const lastMessageDate = Math.max(
              lastRecruiterTime,
              lastCandidateTime,
            );

            const paymentDate = new Date(
              connection?.paidAt ?? 0,
            ).toDateString()
              .split(' ')
              .slice(1)
              .join(' ');

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
                      <span className={cn(styles.buddyName, typography.smallCaption, 'c-semidark-chocolate')}>
                        {connection.candidateUser?.computedName ?? (
                          t(`${Namespaces.Profile}:connections_closed_contacts_title`)
                        )}
                      </span>
                      <span className={cn(
                        styles.buddyPosition, typography.smallText,
                      )}
                      >
                        {connection.candidateProfile.position}
                      </span>
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
                    {t(`${Namespaces.Profile}:hirings_hiring_day`)}
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
                    {Math.ceil((connection.candidateProfile.salary ?? 0) * 12)}
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
                <td className={cn(styles.tableCell, hiringStyles.status, {
                  [hiringStyles.processConnection]: (
                    connection.isPaymentRequested
                    && !connection?.paidAt
                  ),
                  [hiringStyles.paidConnection]: connection?.paidAt,
                })}
                >
                  {!connection.isPaymentRequested && (
                    <Button
                      className={hiringStyles.payButton}
                      mode={Button.mode.Primary}
                      size={Button.size.SmallWide}
                      text='Pay'
                      onClick={() => clickHandler(connection)}
                    />
                  )}
                  {connection.isPaymentRequested
                    && !connection?.paidAt
                    && (
                    <span className={hiringStyles.historyCell}>
                      <IconCircle />
                      <span>
                        Processing
                      </span>
                    </span>
                    )}
                  {connection?.paidAt
                    && (
                      <span className={hiringStyles.historyCell}>
                        <IconCheck />
                        <span className={hiringStyles.paidConnection}>
                          {paymentDate}
                        </span>
                      </span>
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
