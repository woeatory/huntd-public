import React, { FC, useEffect, useMemo } from 'react';
import {
  EmploymentTypeBaseFragment,
  useEmploymentTypesQuery,
} from '@/controllers/graphql/generated';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { CheckboxGroup } from '@/components/FormElements/FormField/CheckboxGroup';
import { InputCheckboxUi } from '@/components/FormElements/FormInputs/InputCheckbox';

export const getEmploymentTypesOptions = (
  employmentTypes: EmploymentTypeBaseFragment[],
) => employmentTypes.map((employmentType) => ({
  label: employmentType.slug,
  value: `${employmentType.id}`,
}));

interface FieldProps {
  employmentTypes: string[] | null
}

type Props = FormFieldProps<EmploymentTypeBaseFragment[], FieldProps>

export const ProfileEmploymentTypesInput: FC<Props> = (props) => {
  const { initialValue, setValue, register } = props;

  const employmentTypesQueryResult = useEmploymentTypesQuery();

  const employmentTypes = useMemo(
    () => employmentTypesQueryResult.data?.employmentTypes ?? [],
    [employmentTypesQueryResult],
  );

  const employmentTypesOptions = useMemo(
    () => getEmploymentTypesOptions(employmentTypes),
    [employmentTypes],
  );

  useEffect(() => {
    if (initialValue?.length) {
      setValue('employmentTypes', initialValue.map(
        (employmentType) => String(employmentType.id),
      ));
    }
  }, [initialValue, setValue]);

  return (
    <CheckboxGroup
      error={props.errors.employmentTypes}
    >
      {employmentTypesOptions.map(({ value, label }) => (
        <div
          key={value}
          className="mb-8"
        >
          <InputCheckboxUi
            disabled={props.formDisabled}
            label={label}
            name="employmentTypes"
            value={value}
            ref={register}
          />
        </div>
      ))}
    </CheckboxGroup>
  );
};
