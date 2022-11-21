import React, { FC } from 'react';
import cn from 'classnames';
import { IconAsterisk } from '@/ui/icons/general/IconAsterisk';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import styles from './ProfileStatus.module.scss';

interface Props {
  text: string;
  className?: string;
}

export const ProfileStatus: FC<Props> = (props) => {
  const { text, className } = props;
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <div className={cn(
      styles.profileStatus,
      className,
      'mb-32',
    )}
    >
      <span>
        {t(`${Namespaces.Profile}:profile`)}
      </span>
      <IconAsterisk />
      <span className={styles.profileStatusName}>
        {text}
      </span>
    </div>
  );
};
