import React, { memo } from 'react';
import cn from 'classnames';
import { Link } from '@/controllers/i18n/i18n.client';
import buttons from '@/ui/buttons/buttons.module.scss';
import typography from '@/ui/typography/typography.module.scss';
import { NewVacancyForm } from '@/components/Vacancies/VacanciesModal/NewVacancyForm/NewVacancyForm';
import styles from './VacanciesModal.module.scss';

interface Props {
  data: {
    title: string;
    text: string;
    linkLabel?: string;
    link?: string;
  }
  handleVacancyPost?: (vacancyLink: string, contactEmail: string) => void;
  addNewJob?: boolean;
}
export const VacanciesModal = memo<Props>((props) => {
  const { data, handleVacancyPost, addNewJob } = props;
  const {
    title, linkLabel, link, text,
  } = data;

  return (
    <div className={styles.modalWrapper}>
      <h3 className={cn('mb-24', typography.accentTitle)}>
        {title}
      </h3>
      <p className={cn(typography.smallText, 'mb-24')}>
        {text}
      </p>
      {(addNewJob && handleVacancyPost) && (
        <NewVacancyForm handleVacancyPost={handleVacancyPost} />
      )}
      {link && (
      <Link href={link}>
        <a className={cn(buttons.primary, 'button-primary')}>
          {linkLabel}
        </a>
      </Link>
      )}
    </div>
  );
});
