import React, { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/ui/buttons/Button';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import styles from '@/components/Vacancies/VacancyCard/ApplyButton/ApplyButton.module.scss';
import { AppliedVacanciesStorage } from '@/controllers/vacancy/vacancy.typedefs';

interface Props {
  appliedVacancies: AppliedVacanciesStorage;
  vacancyId: number;
  handleVacancyApply: () => void;
  className?: string;
}

export const ApplyButton = memo<Props>(
  (props) => {
    const { t } = useTranslation([Namespaces.Vacancy]);
    const {
      appliedVacancies,
      vacancyId,
      handleVacancyApply,
      className,
    } = props;

    return (
      <div className={cn(styles.appliedWrapper, className)}>
        {appliedVacancies[vacancyId] ? (
          <>
            <div className={styles.appliedMessage}>
              <IconCheck />
              <span>{t(`${Namespaces.Vacancy}:vacancy_applied`)}</span>
            </div>
            <span
              className={styles.appliedLabel}
            >
              {t(`${Namespaces.Vacancy}:wait_for_response`)}
            </span>
          </>
        ) : (
          <Button
            mode={Button.mode.Primary}
            size={Button.size.Small}
            type="button"
            text={t(`${Namespaces.Vacancy}:one_click_apply`)}
            onClick={handleVacancyApply}
          />
        )}
      </div>
    );
  },
);
