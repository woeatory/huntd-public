import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { Routes } from '@/controllers/router/router.constants';
import { FOOTER_SEO_DEVELOPERS_VALUES, FOOTER_SEO_JOBS_VALUES } from '@/components/Base/Footer/Footer.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from './Footer.module.scss';

export const FooterLinks = () => {
  const { t } = useTranslation([Namespaces.Common]);

  return (
    <div className={cn(styles.blocksContainer, 'grid-x grid-margin-x')}>
      <div className={cn(styles.linksBlock, 'cell large-3 medium-4')}>
        <h3 className={cn(styles.linksTitle, 'mb-16')}>
          {t(`${Namespaces.Common}:hire_web3_developer_seo_title`)}
        </h3>

        {FOOTER_SEO_DEVELOPERS_VALUES.map((value) => (
          <Link key={value.title} href={`${Routes.Developers}/${value.route}`}>
            <a className={styles.link}>
              {t(`${Namespaces.Common}:hire_web3_developer_seo_link`, {
                role: value.title,
              })}
            </a>
          </Link>
        ))}

      </div>

      <div className={cn(styles.dividerWrapper, 'large-1')}>
        <div className={styles.blockDivider} />
      </div>

      <div className={cn(styles.linksBlock, 'cell large-3 medium-4')}>
        <h3 className={cn(styles.linksTitle, 'mb-16')}>
          {t(`${Namespaces.Common}:remote_web3_jobs_seo_title`)}
        </h3>

        {FOOTER_SEO_JOBS_VALUES.map((value) => (
          <Link key={value.title} href={`${Routes.Vacancies}/${value.route}`}>
            <a className={styles.link}>
              {t(`${Namespaces.Common}:remote_web3_jobs_seo_link`, {
                role: value.title,
              })}
            </a>
          </Link>
        ))}

      </div>

      <div className={cn(styles.dividerWrapper, 'large-1')}>
        <div className={styles.blockDivider} />
      </div>

      <div className={cn(styles.linksBlock, 'cell large-3 medium-4')}>
        <h3 className={cn(styles.linksTitle, 'mb-16')}>
          {t(`${Namespaces.Common}:remote_web3_salaries_seo_title`)}
        </h3>

        {FOOTER_SEO_JOBS_VALUES.map((value) => (
          <Link key={value.title} href={`${Routes.Salaries}/${value.route}`}>
            <a className={styles.link}>
              {t(`${Namespaces.Common}:remote_web3_salaries_seo_link`, {
                role: value.title,
              })}
            </a>
          </Link>
        ))}

      </div>
    </div>
  );
};
