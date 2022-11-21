import React, { FC, useEffect, useMemo } from 'react';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import {
  Specialization, SpecializationBaseFragment, useSpecializationQuery,
} from '@/controllers/graphql/generated';
import { Select } from '@/components/FormElements/Select';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { FormField } from '@/components/FormElements/FormField';

const getSpecializationsOptions = (
  specializations: Specialization[],
) => specializations.map((specialization) => ({
  label: specialization.name,
  value: `${specialization.id}`,
}));

interface FieldProps {
  specialization?: SelectOption | null
  specializations?: SelectOption[] | null
}

type Props = FormFieldProps<
  SpecializationBaseFragment | SpecializationBaseFragment[] | null,
  FieldProps
>

export const ProfileSpecializationInput: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Form]);

  const specializationQueryResult = useSpecializationQuery();

  const specializations = useMemo(
    () => specializationQueryResult.data?.specializations ?? [],
    [specializationQueryResult],
  );
  const { initialValue, setValue } = props;

  useEffect(() => {
    if (initialValue instanceof Array) {
      setValue('specializations',
        initialValue.map(
          ({ id, name: label }) => (
            {
              label,
              value: String(id),
            }
          ),
        ));
    }
  }, [initialValue, t, setValue]);

  return (
    <FormField
      disabled={props.formDisabled}
      label={{
        for: 'specializations',
        text: t(`${Namespaces.Form}:specialization_label`),
      }}
      error={props.errors.specializations}
      renderInput={(inputProps) => (
        <Select
          {...inputProps}
          control={props.control}
          name="specializations"
          id="specializations"
          isMulti
          hideSelectedOptions
          options={getSpecializationsOptions(specializations || [])}
          validation={{
            required: {
              value: true,
              message: 'specialization_is_required',
            },
          }}
          placeholder={t(`${Namespaces.Form}:specialization_placeholder`)}
        />
      )}
    />
  );
};
