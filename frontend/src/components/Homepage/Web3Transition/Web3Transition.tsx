import React, { FC } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Routes } from '@/controllers/router/router.constants';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import typography from '@/ui/typography/typography.module.scss';
import { IconRocket } from '@/ui/icons/general/IconRocket';
import { IconMoney } from '@/ui/icons/general/IconMoney';
import { IconCase } from '@/ui/icons/general/IconCase';
import { IconWaves } from '@/ui/icons/general/IconWaves';
import { IconCurvedArrowRight } from '@/ui/icons/general/IconCurvedArrowRight';
import styles from './Web3Transition.module.scss';

export const Web3Transition: FC = () => {
  const { t } = useTranslation([Namespaces.Home]);

  return (
    <div className={cn('grid-x grid-margin-x c-extradark-chocolate')}>
      <h2 className={cn('cell large-10 large-offset-1', typography.h2, styles.title)}>
        {t(`${Namespaces.Home}:web3_transition_title`)}
      </h2>
      <div className={cn('cell large-5', styles.list)}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <div className={styles.iconContainer}>
              <IconCase />
            </div>
            <dl className={styles.sublist}>
              <dt className={styles.sublist__term}>
                {t(`${Namespaces.Home}:pick_right_job_term`)}
              </dt>
              <dd
                className={cn(
                  styles.sublist__definition,
                  typography.alertText,
                )}
              >
                {t(`${Namespaces.Home}:pick_right_job_desc`)}
              </dd>
            </dl>
          </li>
          <li className={styles.list_item}>
            <div className={styles.iconContainer}>
              <IconMoney />
            </div>
            <dl className={styles.sublist}>
              <dt className={styles.sublist__term}>
                {t(`${Namespaces.Home}:salary_hike_term`)}
              </dt>
              <dd
                className={cn(
                  styles.sublist__definition,
                  typography.alertText,
                )}
              >
                {t(`${Namespaces.Home}:salary_hike_desc`)}
              </dd>
            </dl>
          </li>
          <li className={styles.list_item}>
            <div className={styles.iconContainer}>
              <IconRocket />
            </div>
            <dl className={styles.sublist}>
              <dt className={styles.sublist__term}>
                {t(`${Namespaces.Home}:build_future_term`)}
              </dt>
              <dd
                className={cn(
                  styles.sublist__definition,
                  typography.alertText,
                )}
              >
                {t(`${Namespaces.Home}:build_future_desc`)}
              </dd>
            </dl>
          </li>
        </ul>
        <Button
          className={styles.discoverButton}
          mode={Button.mode.Primary}
          href={Routes.Vacancies}
          text={t(`${Namespaces.Home}:discover_jobs`)}
        />
      </div>
      <div className={cn('cell large-7', styles.iconBlock)}>
        <IconWaves />
        <div
          className={cn(
            styles.transitionContainer,
            typography.smallHeading,
          )}
        >
          <span>
            {t(`${Namespaces.Home}:web2_start`)}
          </span>
          <IconCurvedArrowRight />
          <span>
            {t(`${Namespaces.Home}:web3_finish`)}
          </span>
        </div>
      </div>
    </div>
  );
};
