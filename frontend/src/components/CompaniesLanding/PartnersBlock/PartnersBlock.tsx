import React from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { Button } from '@/ui/buttons/Button';
import { Routes } from '@/controllers/router/router.constants';
import { IconRio } from '@/ui/icons/partners/IconRio';
import { IconColony } from '@/ui/icons/partners/IconColony';
import { IconGerald } from '@/ui/icons/partners/IconGerald';
import { IconTallFilledStar } from '@/ui/icons/general/IconTallFilledStar';
import { IconGoodNotes } from '@/ui/icons/partners/IconGoodNotes';
import { IconTallStar } from '@/ui/icons/general/IconTallStar';
import { IconCurvedArrowRight } from '@/ui/icons/general/IconCurvedArrowRight';
import { IconSelfDecode } from '@/ui/icons/partners/IconSelfDecode';
import styles from './PartnersBlock.module.scss';

export const PartnersBlock = () => {
  const { t } = useTranslation([Namespaces.CompaniesLanding]);

  const clickHandler = () => {
    analytics.sendEvent(
      analytics.events.companiesLanding.CompaniesFomoClick,
      {},
    );
  };

  return (
    <div className={styles.partnersSection}>
      <div className="grid-container">
        <div className="grid-x grid-margin-x c-semidark-chocolate">
          <div className={cn(styles.startups, 'cell large-offset-1 large-10 xxlarge-offset-2 xxlarge-8')}>
            <div className={styles.starsContainer}>
              <IconTallFilledStar />
              <IconTallStar />
            </div>
            <IconSelfDecode className={styles.partnerLogo} />
            <IconGoodNotes className={styles.partnerLogo} />
            <IconGerald className={styles.partnerLogo} />
            <IconColony className={styles.partnerLogo} />
            <IconRio className={styles.partnerLogo} />
          </div>
          <div className={cn(styles.promo, 'cell large-8 large-offset-2 xxlarge-6 xxlarge-offset-3')}>
            <IconCurvedArrowRight />
            <p className={cn(typography.smallBoldHeading, styles.promoTitle, 'mb-24')}>
              {t(`${Namespaces.CompaniesLanding}:promo_title`)}
            </p>
            <p className={cn(typography.alertText, styles.promoValuesTitle, 'mb-40')}>
              {t(`${Namespaces.CompaniesLanding}:promo_values_title`)}
            </p>
            <div className={cn(typography.text, styles.promoValues, 'mb-40')}>
              <div className={cn(styles.promoValue, 'mb-16')}>
                <IconCheck />
                <p className={styles.valueItem}>
                  {t(`${Namespaces.CompaniesLanding}:promo_value_first`)}
                </p>
              </div>
              <div className={cn(styles.promoValue, 'mb-16')}>
                <IconCheck />
                <p className={styles.valueItem}>
                  {t(`${Namespaces.CompaniesLanding}:promo_value_second`)}
                </p>
              </div>
              <div className={cn(styles.promoValue, 'mb-16')}>
                <IconCheck />
                <p className={styles.valueItem}>
                  {t(`${Namespaces.CompaniesLanding}:promo_value_third`)}
                </p>
              </div>
            </div>
          </div>
          <Button
            className='cell large-2 medium-4 large-offset-5 medium-offset-4'
            size={Button.size.LargeWide}
            mode={Button.mode.Primary}
            text={t(`${Namespaces.CompaniesLanding}:hire_now`)}
            href={Routes.Candidates}
            onClick={clickHandler}
          />
        </div>
      </div>
    </div>
  );
};
