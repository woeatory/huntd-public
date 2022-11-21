import React, { Dispatch, SetStateAction, FC } from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Button } from '@/ui/buttons/Button';
import { NewTemplateMessage } from '@/components/Profile/HiringManagementModule/MessageTemplates/NewTemplateMessage/NewTemplateMessage';
import typography from '@/ui/typography/typography.module.scss';
import styles from './EmptyTemplates.module.scss';

interface Props {
  isNewTemplate: boolean;
  setIsNewTemplate: Dispatch<SetStateAction<boolean>>;
}

export const EmptyTemplates: FC<Props> = (props) => {
  const { isNewTemplate, setIsNewTemplate } = props;

  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <>
      {!isNewTemplate && (
        <div className="cell large-6 large-offset-3">
          <h2 className={cn(typography.smallHeading, 'mb-8')}>
            {t(`${Namespaces.Profile}:empty_template_title`)}
          </h2>
          <p className={cn(styles.emptyTemplatesText, 'mb-40')}>
            {t(`${Namespaces.Profile}:empty_template_text`)}
          </p>
          <Button
            mode={Button.mode.Primary}
            onClick={() => setIsNewTemplate((prevValue) => !prevValue)}
            text={t(`${Namespaces.Profile}:add_template_button`)}
          />
        </div>
      )}
      <div className="cell large-offset-2 large-9">
        <NewTemplateMessage
          isNewTemplate={isNewTemplate}
          setIsNewTemplate={setIsNewTemplate}
        />
      </div>
    </>
  );
};
