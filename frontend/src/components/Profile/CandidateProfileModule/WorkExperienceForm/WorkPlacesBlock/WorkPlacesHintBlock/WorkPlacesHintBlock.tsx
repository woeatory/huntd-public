import React from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { IconIncognito } from '@/ui/icons/general/IconIncognito';
import styles from './WorkPlacesHintBlock.module.scss';

export const WorkPlacesHintBlock = () => {
  const { t } = useTranslation([Namespaces.Form, Namespaces.Profile]);

  return (
    <div className="cell large-7 large-offset-3 mb-16">
      <div className={styles.hintContainer}>

        <div className={cn(styles.textContainer, 'mb-8')}>
          <IconIncognito />
          <p className={cn(typography.smallCaption, 'c-semidark-chocolate mb-8 ml-8')}>
            {t(`${Namespaces.Profile}:hidden_info_hint`)}
          </p>
        </div>
        <p className={cn(typography.smallText, 'c-semidark-chocolate')}>
          {t(`${Namespaces.Profile}:make_changes_hint`)}
        </p>
      </div>
    </div>
  );
};
