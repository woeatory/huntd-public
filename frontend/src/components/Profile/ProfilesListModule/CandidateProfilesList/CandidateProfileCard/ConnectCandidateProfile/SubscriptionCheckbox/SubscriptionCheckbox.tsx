import React, { FC } from 'react';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { InputCheckboxUi } from '@/components/FormElements/FormInputs/InputCheckbox';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

interface FieldProps {
  shouldCreateSubscription: boolean;
}

interface Props {
  className?: string;
}

type SubscriptionCheckboxProps = FormFieldProps<boolean, FieldProps> & Props;

export const SubscriptionCheckbox: FC<SubscriptionCheckboxProps> = (props) => {
  const { register, formDisabled, className } = props;

  const { t } = useTranslation([Namespaces.Form]);

  return (
    <InputCheckboxUi
      className={className}
      name='shouldCreateSubscription'
      label={t(`${Namespaces.Form}:subscription_checkbox_label`)}
      ref={register}
      disabled={formDisabled}
      defaultChecked
    />
  );
};
