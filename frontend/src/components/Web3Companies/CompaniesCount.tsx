import React, { FC } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import styles from './Web3Companies.module.scss';

interface Props {
  count: number;
}

export const CompaniesCount: FC<Props> = ({ count }) => (
  <h2 className={cn(styles.companiesCount, `${styles.rowSubtitleTest}--${count}`)}>
    <span className={typography.caption}>
      {`${count}0/`}
    </span>
    100
  </h2>
);
