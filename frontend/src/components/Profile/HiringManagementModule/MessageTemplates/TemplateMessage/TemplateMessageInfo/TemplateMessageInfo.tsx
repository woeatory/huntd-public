import React, {
  Dispatch, FC, SetStateAction, useCallback, useEffect,
} from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { TemplatesInputTitle } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectCandidateProfile/TemplatesInputTitle/TemplatesInputTitle';
import { InputTextAreaUi } from '@/components/FormElements/FormInputs/InputTextArea';
import { FormField } from '@/components/FormElements/FormField';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { UserTemplateMessage, useUpdateMessageTemplateMutation } from '@/controllers/graphql/generated';
import { UseCreateMessageTemplate } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useCreateMessageTemplate';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { TemplateActionButtons } from '@/components/Profile/HiringManagementModule/MessageTemplates/TemplateMessage/TemplateActionButtons/TemplateActionButtons';
import { UseDeleteMessageTemplate } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useDeleteMessageTemplate';
import { analytics } from '@/controllers/analytics/analytics.client';
import styles from './TemplateMessageInfo.module.scss';

interface FormData {
  messageBody: string;
  messageTitle: string;
}

interface Props {
  template: UserTemplateMessage;
  isSelected?: boolean;
  isNewTemplate?: boolean;
  isTemplateVisible: boolean;
  setIsTemplateVisible: Dispatch<SetStateAction<boolean>>;
}

export const TemplateMessageInfo: FC<Props> = (props) => {
  const {
    template,
    isSelected,
    isNewTemplate,
    isTemplateVisible,
    setIsTemplateVisible,
  } = props;

  const formMethods = useForm<FormData>({
    mode: 'onSubmit',
  });

  const { register, handleSubmit, reset } = formMethods;

  const { t } = useTranslation(Namespaces.Form);

  const [user] = useAuthUser();
  const [createMessageTemplate] = UseCreateMessageTemplate();
  const [deleteMessageTemplate] = UseDeleteMessageTemplate();
  const [updateMessageTemplate] = useUpdateMessageTemplateMutation();

  useEffect(() => {
    if (!isSelected) {
      setIsTemplateVisible(false);
    }
  }, [setIsTemplateVisible, isSelected]);

  const saveTemplate = handleSubmit(async (data) => {
    const { messageTitle, messageBody } = data;

    if (isNewTemplate) {
      await createMessageTemplate(messageTitle, messageBody);

      analytics.sendEvent(
        analytics.events.templates.TemplateCreated,
        {},
      );
    }

    if (template && user && !isNewTemplate) {
      await updateMessageTemplate({
        variables: {
          id: template.id,
          userId: user.id,
          values: {
            messageTitle,
            messageBody,
          },
        },
      });
    }

    setIsTemplateVisible(false);
    reset();
  });

  const deleteTemplate = useCallback(async () => {
    if (template && user) {
      await deleteMessageTemplate(template.id, user.id);

      analytics.sendEvent(
        analytics.events.templates.TemplateDeleted,
        {},
      );
    }
  }, [user, template, deleteMessageTemplate]);

  const cancel = useCallback(() => {
    setIsTemplateVisible(false);

    reset();
  }, [reset, setIsTemplateVisible]);

  return (
    <form
      onSubmit={saveTemplate}
      className={cn(styles.templateInfo, {
        [styles.overlay]: ((isSelected && isTemplateVisible) || isNewTemplate),
      })}
    >
      <FormField
        label={{
          for: 'messageTitle',
          text: t(`${Namespaces.Form}:template_title_label`),
        }}
        className="mb-16"
        disabled={false}
        renderInput={(fieldProps) => (
          <TemplatesInputTitle
            {...formMethods}
            {...fieldProps}
            isVisible
            formDisabled={false}
            defaultValue={template.messageTitle}
          />
        )}
      />

      <FormField
        label={{
          for: 'messageBody',
          text: t(`${Namespaces.Form}:message_body_label`),
        }}
        disabled={false}
        renderInput={(fieldProps) => (
          <InputTextAreaUi
            {...fieldProps}
            className={styles.templateTextarea}
            name='messageBody'
            rows={9}
            defaultValue={template.messageBody}
            ref={register}
            placeholder={t(`${Namespaces.Form}:message_body_placeholder`)}
          />
        )}
      />
      <TemplateActionButtons
        cancel={cancel}
        deleteTemplate={deleteTemplate}
        isNewTemplate={isNewTemplate}
      />
    </form>
  );
};
