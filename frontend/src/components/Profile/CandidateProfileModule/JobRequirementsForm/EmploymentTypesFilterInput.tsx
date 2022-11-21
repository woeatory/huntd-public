import React, { FC, useEffect, useMemo } from 'react';
import { useEmploymentTypesQuery } from '@/controllers/graphql/generated';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { getEmploymentTypesOptions } from '@/components/Profile/CandidateProfileModule/JobRequirementsForm/ProfileEmploymentTypesInput';
import { CheckboxGroup } from '@/components/FormElements/FormField/CheckboxGroup';
import { InputCheckboxUi } from '@/components/FormElements/FormInputs/InputCheckbox';

interface FieldProps {
  employmentTypes: string[]
}

type Props = FormFieldProps<number[], FieldProps>

export const EmploymentTypesFilterInput: FC<Props> = (props) => {
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
    if (initialValue && employmentTypes.length) {
      const values = initialValue.map((item) => String(item));

      setValue('employmentTypes', values);
    }
  }, [initialValue, setValue, employmentTypes]);

  return (
    <CheckboxGroup>
      {employmentTypesOptions.map(({ value, label }) => (
        <div
          className="mb-8"
          key={value}
        >
          <InputCheckboxUi
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
