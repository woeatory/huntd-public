import React, {
  Dispatch, FC, SetStateAction, useCallback, useState, useMemo,
} from 'react';
import { UserTemplateMessage } from '@/controllers/graphql/generated';
import { TemplateMessageInfo } from '@/components/Profile/HiringManagementModule/MessageTemplates/TemplateMessage/TemplateMessageInfo/TemplateMessageInfo';
import styles from './TemplateMessage.module.scss';

interface Props {
  template: UserTemplateMessage;
  selectedTemplateId?: number | null;
  setSelectedTemplateId?: Dispatch<SetStateAction<number | null>>;
}

export const TemplateMessage: FC<Props> = (props) => {
  const {
    template,
    selectedTemplateId,
    setSelectedTemplateId,
  } = props;

  const [isTemplateVisible, setIsTemplateVisible] = useState(false);

  const openTemplate = useCallback(() => {
    setIsTemplateVisible(true);

    if (setSelectedTemplateId) {
      setSelectedTemplateId(template.id);
    }
  }, [
    template,
    setIsTemplateVisible,
    setSelectedTemplateId,
  ]);

  const isSelected = useMemo(() => selectedTemplateId === template.id,
    [template, selectedTemplateId]);

  return (
    <>
      {!isTemplateVisible && (
        <button
          type="button"
          className={styles.templateTitle}
          onClick={openTemplate}
        >
          {template.messageTitle}
        </button>
      )}
      <TemplateMessageInfo
        template={template}
        isSelected={isSelected}
        isTemplateVisible={isTemplateVisible}
        setIsTemplateVisible={setIsTemplateVisible}
      />
    </>
  );
};
