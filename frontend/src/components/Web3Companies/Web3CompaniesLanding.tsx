import React, { useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { analytics } from '@/controllers/analytics/analytics.client';
import { COMPANIES } from './constants';
import styles from './Web3Companies.module.scss';
import { CompanyCard } from './CompanyCard';
import { CompaniesCount } from './CompaniesCount';

export const Web3CompaniesLanding = () => {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  const { t } = useTranslation([Namespaces.Common]);

  useEffect(() => {
    analytics.sendEvent(
      analytics.events.pageInteraction.VisitCompaniesPage,
      {},
    );
  }, []);

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x mt-80">
        <div className={cn(styles.titleBlock, 'large-offset-3 large-6 medium-offset-2 medium-8')}>
          <p className={styles.subtitle}>
            {t(`${Namespaces.Common}:web3_companies_subtitle`)}
          </p>
          <h1 className={styles.title}>
            {t(`${Namespaces.Common}:web3_companies_title`)}
          </h1>
        </div>
        <div className={styles.companiesGrid}>
          {numbers.map((number) => (
            <CompaniesCount count={number} />
          ))}
          <div className={cn(styles.companiesContainer, 'large-12 grid-x grid-margin-x')}>
            {COMPANIES.map((company) => (
              <CompanyCard
                company={company}
                key={company.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
