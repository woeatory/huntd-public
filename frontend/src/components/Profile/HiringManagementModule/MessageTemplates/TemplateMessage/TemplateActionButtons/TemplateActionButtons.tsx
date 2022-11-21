import React, { FC } from 'react';
import cn from 'classnames';
import { Button } from '@/ui/buttons/Button';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import styles from './TemplateActionButtons.module.scss';

interface Props {
  cancel: () => void;
  deleteTemplate: () => void;
  isNewTemplate?: boolean;
}

export const TemplateActionButtons: FC<Props> = (props) => {
  const { cancel, deleteTemplate, isNewTemplate } = props;

  const { t } = useTranslation(Namespaces.Form);

  return (
    <div className={cn('mt-16', styles.templateActionsWrapper)}>
      <div>
        <Button
          mode={Button.mode.Primary}
          type="submit"
          className={cn('mr-16', styles.templateButton)}
          text={t(`${Namespaces.Form}:save_template_button`)}
        />

        <Button
          mode={Button.mode.Secondary}
          type="button"
          className={styles.templateButton}
          onClick={cancel}
          text={t(`${Namespaces.Form}:cancel_template_button`)}
        />
      </div>
      {!isNewTemplate && (
        <button
          type="button"
          className={styles.deleteTemplateButton}
          onClick={deleteTemplate}
        >
          {t(`${Namespaces.Form}:delete_template_button`)}
        </button>
      )}
    </div>
  );
};
