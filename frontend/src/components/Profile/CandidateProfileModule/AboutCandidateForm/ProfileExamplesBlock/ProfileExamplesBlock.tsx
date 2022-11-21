import React from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { IconArrowRotate } from '@/ui/icons/general/IconArrowRotate';
import { goodProfileExamples } from '@/controllers/candidateProfile/candidateProfile.constants';
import styles from './ProfileExamplesBlock.module.scss';

export const ProfileExamplesBlock = () => {
  const { t } = useTranslation([Namespaces.Form]);

  return (
    <div className={styles.hintContainer}>
      <p className={cn(typography.smallCaption, 'c-semidark-chocolate mb-12')}>
        {t(`${Namespaces.Form}:hints`)}
      </p>
      <p className={cn(typography.smallText, 'c-semidark-chocolate mb-8')}>
        {t(`${Namespaces.Form}:fill_sections_well_hint`)}
      </p>
      <p className={cn(typography.smallText, 'c-semidark-chocolate mb-8')}>
        {t(`${Namespaces.Form}:answer_placeholder_hint`)}
      </p>
      <p className={cn(typography.smallText, 'c-semidark-chocolate mb-16')}>
        {t(`${Namespaces.Form}:see_examples_hint`)}
      </p>
      <p className={cn(typography.smallCaption, 'c-semidark-chocolate mb-12')}>
        {t(`${Namespaces.Form}:well_filled_examples`)}
      </p>
      <div className={styles.examplesContainer}>
        {goodProfileExamples.map((example) => (
          <a
            key={example.title}
            href={example.link}
            className={cn(styles.goodExampleLink, 'mr-16')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {example.title}
            <IconArrowRotate />
          </a>
        ))}
      </div>
    </div>
  );
};
