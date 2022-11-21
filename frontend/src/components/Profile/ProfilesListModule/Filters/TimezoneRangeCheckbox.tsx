import React, { FC, useEffect } from 'react';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { InputCheckboxUi } from '@/components/FormElements/FormInputs/InputCheckbox';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

interface FieldProps {
  timezoneReverseMode: boolean;
}

interface Props {
  className?: string;
}

type TimezoneRangeCheckboxProps = FormFieldProps<boolean, FieldProps> & Props;

export const TimezoneRangeCheckbox: FC<TimezoneRangeCheckboxProps> = (
  props,
) => {
  const {
    register, formDisabled, className,
    initialValue, setValue,
  } = props;

  const { t } = useTranslation([Namespaces.Form]);

  useEffect(() => {
    setValue('timezoneReverseMode', initialValue);
  }, [initialValue, setValue]);

  useEffect(() => () => {
    setValue('timezoneReverseMode', false);
  }, [setValue]);

  return (
    <InputCheckboxUi
      className={className}
      name='timezoneReverseMode'
      label={t(`${Namespaces.Form}:range_outside`)}
      ref={register}
      disabled={formDisabled}
    />
  );
};
