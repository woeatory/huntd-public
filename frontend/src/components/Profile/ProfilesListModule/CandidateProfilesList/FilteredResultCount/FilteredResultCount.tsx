import cn from 'classnames';
import React from 'react';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';

interface Props {
  count: number;
}

export const FilteredResultCount = ({ count }: Props) => {
  const { t } = useTranslation([Namespaces.Common]);

  return (
    <p className={cn(typography.smallText, 'c-semidark-chocolate')}>
      {t(`${Namespaces.Common}:search_results`, { count })}
    </p>
  );
};
