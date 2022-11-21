import React, { FC } from 'react';
import cn from 'classnames';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { InputTextUi } from '@/components/FormElements/FormInputs/InputText';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from './TemplatesInputTitle.module.scss';

interface FieldProps {
  messageTitle: string;
}

interface Props {
  isVisible?: boolean;
  shouldCreateTemplate?: boolean;
  className?: string;
  defaultValue?: string;
}

type TemplatesInputProps = FormFieldProps<string, FieldProps> & Props;

export const TemplatesInputTitle: FC<TemplatesInputProps> = (props) => {
  const {
    register,
    className,
    formDisabled,
    isVisible,
    shouldCreateTemplate,
    defaultValue,
  } = props;

  const { t } = useTranslation([Namespaces.Form]);

  return (
    <InputTextUi
      className={cn(className, styles.messageTitleIsVisible, {
        [styles.messageTitle]: !isVisible,
        [styles.messageTitleIsOpened]: shouldCreateTemplate,
      })}
      name='messageTitle'
      defaultValue={defaultValue}
      placeholder={t(`${Namespaces.Form}:templates_title_placeholder`)}
      ref={register}
      disabled={formDisabled}
    />
  );
};
