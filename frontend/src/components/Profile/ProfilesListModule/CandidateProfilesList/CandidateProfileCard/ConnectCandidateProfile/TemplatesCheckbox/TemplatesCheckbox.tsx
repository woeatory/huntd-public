import React, { FC } from 'react';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { InputCheckboxUi } from '@/components/FormElements/FormInputs/InputCheckbox';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

interface FieldProps {
  shouldCreateTemplate: boolean;
}

interface Props {
  className?: string;
}

type TemplatesCheckboxProps = FormFieldProps<boolean, FieldProps> & Props;

export const TemplatesCheckbox: FC<TemplatesCheckboxProps> = (props) => {
  const { register, formDisabled, className } = props;

  const { t } = useTranslation([Namespaces.Form]);

  return (
    <InputCheckboxUi
      className={className}
      name='shouldCreateTemplate'
      label={t(`${Namespaces.Form}:templates_checkbox_label`)}
      ref={register}
      disabled={formDisabled}
    />
  );
};
