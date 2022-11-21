import React, { Dispatch, FC, SetStateAction } from 'react';
import { TemplateMessageInfo } from '@/components/Profile/HiringManagementModule/MessageTemplates/TemplateMessage/TemplateMessageInfo/TemplateMessageInfo';

interface Props {
  isNewTemplate: boolean;
  setIsNewTemplate: Dispatch<SetStateAction<boolean>>;
}

export const NewTemplateMessage: FC<Props> = (props) => {
  const { isNewTemplate, setIsNewTemplate } = props;

  return (
    <TemplateMessageInfo
      template={{ id: 0, messageBody: '', messageTitle: '' }}
      isNewTemplate={isNewTemplate}
      isTemplateVisible={isNewTemplate}
      setIsTemplateVisible={setIsNewTemplate}
    />
  );
};
