import React from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { REASONS_LIST } from '@/components/CompaniesLanding/RealHiringBlock/constants';
import typography from '@/ui/typography/typography.module.scss';
import styles from './RealHiringBlock.module.scss';

export const RealHiringBlock = () => {
  const { t } = useTranslation([Namespaces.CompaniesLanding]);

  return (
    <div className='grid-x grid-margin-x c-semidark-chocolate'>
      <h2 className={cn(
        'cell large-6 large-offset-3 mb-48',
        typography.h2,
        styles.title,
      )}
      >
        {t(`${Namespaces.CompaniesLanding}:real_hiring_title`)}
      </h2>

      <dl className={cn('cell large-7 large-offset-3', styles.reasonsList)}>
        {REASONS_LIST.map(({ Icon, title, description }) => (
          <div className={styles.reasonItem} key={title}>
            <dt className={cn(styles.reasonTitle, typography.accentTitle)}>
              <span className={styles.iconContainer}>
                <Icon />
              </span>
              {t(`${Namespaces.CompaniesLanding}:${title}`)}
            </dt>
            <dd className={cn(styles.reasonDescription, typography.text)}>
              {t(`${Namespaces.CompaniesLanding}:${description}`)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
