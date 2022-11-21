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

export const getSpecializationsOptions = (
  specializations: Specialization[],
) => specializations.map((specialization) => ({
  label: specialization.name.toUpperCase(),
  value: `${specialization.id}`,
}));

interface FieldProps {
  specializations: SelectOption[]
}

type Props = FormFieldProps<SpecializationBaseFragment[] | null, FieldProps>

export const SpecializationFilterInput: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Form, Namespaces.Candidates]);

  const specializationQueryResult = useSpecializationQuery();

  const specializations = useMemo(
    () => specializationQueryResult.data?.specializations ?? [],
    [specializationQueryResult],
  );
  const { initialValue, setValue, getValues } = props;

  useEffect(() => {
    if (initialValue && specializations.length) {
      setValue('specializations',
        initialValue.map((spec) => ({
          label: spec.name.toUpperCase(),
          value: `${spec.id}`,
        })));
    }
  }, [initialValue, t, setValue, specializations]);

  return (
    <FormField
      disabled={props.formDisabled}
      label={{
        for: 'specializations',
        text: t(`${Namespaces.Candidates}:specializations_filters_label`),
      }}
      renderInput={(inputProps) => (
        <Select
          {...inputProps}
          control={props.control}
          name="specializations"
          id="specializations"
          isOptionSelected={(option) => {
            const currentValues = getValues('specializations');

            return currentValues
              ? currentValues.some((spec) => spec.label === option.label)
              : false;
          }}
          isMulti
          options={getSpecializationsOptions(specializations)}
          placeholder={t(`${Namespaces.Candidates}:specializations_filters_placeholder`)}
        />
      )}
    />
  );
};
