import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { AppButtons } from '@/components/Homepage/MobileApp/AppsButtons';
import { AppDevice } from '@/components/Homepage/MobileApp/AppDevice';
import styles from './MobileApp.module.scss';

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const MobileApp: FC<Props> = ({ className }) => {
  const { t } = useTranslation([Namespaces.Home]);

  return (
    <div className={cn('grid-x c-semidark-chocolate', styles.container)}>
      <AppDevice className={className} />

      <div className={cn(styles.description, 'cell medium-9 large-5')}>
        <h2 className={cn(typography.accentTitle, 'mb-16')}>
          {t(`${Namespaces.Home}:mobile_app_title`)}
        </h2>

        <p className={cn(typography.alertText, 'mb-64')}>
          {t(`${Namespaces.Home}:mobile_app_description`)}
        </p>

        <p className={cn(typography.smallCaption, 'mb-24')}>
          {t(`${Namespaces.Home}:mobile_stores_free_info`)}
        </p>

        <AppButtons
          className={styles.descriptionButtons}
        />
      </div>
    </div>
  );
};
