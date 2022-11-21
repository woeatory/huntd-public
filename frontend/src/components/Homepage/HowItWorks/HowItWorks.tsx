import React from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { Blocks } from '@/components/Homepage/HowItWorks/Blocks';
import styles from './HowItWorks.module.scss';

export const HowItWorks = () => {
  const { t } = useTranslation([Namespaces.Home, Namespaces.Common]);

  return (
    <div className="grid-x grid-margin-x c-semidark-chocolate">
      <h2 className={cn(typography.h2, styles.title, 'cell large-8 large-offset-2 small-mb-32 mb-64')}>
        {t(`${Namespaces.Home}:how_it_works_title`)}
      </h2>

      <Blocks />
    </div>
  );
};
