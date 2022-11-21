import React from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { DEMO_COMPANIES } from '@/components/Web3Companies/constants';
import { CompanyCard } from '@/components/Web3Companies/CompanyCard';
import { Button } from '@/ui/buttons/Button';
import { IconArrowLeft } from '@/ui/icons/general/IconArrowLeft';
import { Routes } from '@/controllers/router/router.constants';
import styles from './Footer.module.scss';

export const Web3FooterBlock = () => {
  const { t } = useTranslation(Namespaces.Common);

  return (
    <div className={styles.web3BlockContainer}>
      <p className={cn(typography.overhead, 'mb-8')}>
        {t(`${Namespaces.Common}:web3_companies_subtitle`)}
      </p>
      <h2 className={cn(styles.web3Title, 'mb-32')}>
        {t(`${Namespaces.Common}:web3_companies_title`)}
      </h2>

      <div className={styles.companiesWrapper}>
        {DEMO_COMPANIES.map((company) => (
          <div key={company.id} className={styles.companyCard}>
            <CompanyCard
              company={company}
            />
          </div>
        ))}
      </div>

      <Button
        text="View top 100"
        href={Routes.Web3Companies}
        mode={Button.mode.Primary}
        RightIcon={IconArrowLeft}
        className={styles.button}
      />
    </div>
  );
};
