import React, { FC } from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Button } from '@/ui/buttons/Button';
import typography from '@/ui/typography/typography.module.scss';
import { Routes } from '@/controllers/router/router.constants';
import styles from './EmptyList.module.scss';

interface Props {
  heading: string;
  subheading: string;
}

export const EmptyList: FC<Props> = ({
  heading, subheading,
}) => {
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <>
      <div className="cell medium-7 large-5 large-offset-3">
        <h2 className={cn(typography.smallHeading, 'mb-8')}>
          {heading}
        </h2>
        <p className={cn(styles.text, 'mb-40')}>
          {subheading}
        </p>
        <Button
          mode={Button.mode.Primary}
          href={Routes.Candidates}
          text={t(`${Namespaces.Profile}:search_candidates_button`)}
        />
      </div>
    </>
  );
};
