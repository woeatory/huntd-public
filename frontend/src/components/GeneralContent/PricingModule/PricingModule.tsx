import React, { useEffect } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { Button } from '@/ui/buttons/Button';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Routes } from '@/controllers/router/router.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { analytics } from '@/controllers/analytics/analytics.client';
import styles from './PricingModule.module.scss';

export const PricingModule = () => {
  const { t } = useTranslation([Namespaces.Pricing, Namespaces.Profile]);

  useEffect(() => {
    analytics.sendEvent(
      analytics.events.pageInteraction.VisitPricingPage,
      {},
    );
  }, []);

  return (
    <div className={cn('grid-x align-middle c-semidark-chocolate', styles.container)}>
      <div className="cell large-5 medium-6 mb-32">
        <h2 className={cn(styles.pricingTitle, 'mb-16')}>
          {t(`${Namespaces.Pricing}:pricing_page_title_part1`)}
          <span className='c-citrus'>
            {t(`${Namespaces.Pricing}:pricing_page_title_part2`)}
          </span>
        </h2>

        <p className={typography.alertText}>
          {t(`${Namespaces.Pricing}:pricing_page_subtitle`)}
        </p>
      </div>

      <div className={cn('cell large-5 medium-5', styles.pricingBox)}>
        <div className={styles.wrapper}>
          <div className={styles.pricingBlock}>
            <p className={cn(typography.accentTitle, 'mb-4')}>
              {t(`${Namespaces.Pricing}:pricing_free_trial_title`)}
            </p>
            <p className='mb-16'>
              {t(`${Namespaces.Pricing}:pricing_free_trial_description`)}
            </p>
            <p className={cn(typography.accentTitle, 'mb-4')}>
              {t(`${Namespaces.Pricing}:pricing_pay_per_hire_title`)}
            </p>
            <p className='mb-32'>
              {t(`${Namespaces.Pricing}:pricing_pay_per_hire_description`)}
            </p>

            <Button
              className={styles.huntButton}
              size={Button.size.LargeWide}
              mode={Button.mode.Primary}
              text={t(`${Namespaces.Profile}:start_hunt`)}
              href={Routes.Candidates}
            />
          </div>
          <div className={styles.advantagesBlock}>
            <p className='mb-8'>
              {t(`${Namespaces.Pricing}:pricing_no_contracts`)}
            </p>
            <p className='mb-8'>
              {t(`${Namespaces.Pricing}:pricing_no_commitments`)}
            </p>
            <p className='mb-8'>
              {t(`${Namespaces.Pricing}:pricing_free_posting`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
