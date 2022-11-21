import React, { memo } from 'react';
import { Button } from '@/ui/buttons/Button';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from '@/components/Vacancies/VacancyCard/ApplyButton/ApplyButton.module.scss';

interface Props {
  href?: string | null;
  handleVacancyApply: () => void;
}

export const SourcedApplyButton = memo<Props>(
  (props) => {
    const { href } = props;
    const { t } = useTranslation([Namespaces.Vacancy]);
    const { handleVacancyApply } = props;

    return (
      <div className={styles.appliedWrapper}>
        <Button
          href={href ?? undefined}
          target="_blank"
          mode={Button.mode.Primary}
          size={Button.size.Small}
          className={styles.applyButton}
          type="button"
          text={t(`${Namespaces.Vacancy}:one_click_apply`)}
          onClick={handleVacancyApply}
        />
      </div>
    );
  },
);
