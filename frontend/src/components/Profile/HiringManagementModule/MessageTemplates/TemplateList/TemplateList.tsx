import React, { Dispatch, FC, SetStateAction } from 'react';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { TemplateMessage } from '@/components/Profile/HiringManagementModule/MessageTemplates/TemplateMessage/TemplateMessage';
import { NewTemplateMessage } from '@/components/Profile/HiringManagementModule/MessageTemplates/NewTemplateMessage/NewTemplateMessage';
import { UserTemplateMessage } from '@/controllers/graphql/generated';
import styles from './TemplateList.module.scss';

interface Props {
  templates: UserTemplateMessage[];
  isNewTemplate: boolean;
  setIsNewTemplate: Dispatch<SetStateAction<boolean>>;
  selectedTemplateId: number | null;
  setSelectedTemplateId?: Dispatch<SetStateAction<number | null>>;
}

export const TemplateList: FC<Props> = (props) => {
  const {
    templates,
    isNewTemplate,
    setIsNewTemplate,
    selectedTemplateId,
    setSelectedTemplateId,
  } = props;

  const { t } = useTranslation(Namespaces.Form);

  return (
    <div className="cell large-offset-1 large-9">
      <div className={styles.templatesHeader}>
        <p>
          {t(`${Namespaces.Form}:message_title_label`)}
        </p>
        <button
          type="button"
          className={styles.newTemplateButton}
          onClick={() => setIsNewTemplate((prevValue) => !prevValue)}
        >
          <span className={styles.newTemplateButtonText}>
            {t(`${Namespaces.Form}:new_template_button`)}
          </span>
        </button>
      </div>
      <NewTemplateMessage
        isNewTemplate={isNewTemplate}
        setIsNewTemplate={setIsNewTemplate}
      />
      <section className={styles.templatesSection}>
        {templates.map((template) => (
          <TemplateMessage
            key={template.id}
            template={template}
            selectedTemplateId={selectedTemplateId}
            setSelectedTemplateId={setSelectedTemplateId}
          />
        ))}
      </section>
    </div>
  );
};
