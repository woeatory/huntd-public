import React, { FC } from 'react';
import debounce from 'debounce-promise';
import { TechnologyBaseFragment, useTechnologiesQuery } from '@/controllers/graphql/generated';
import { AsyncSelect } from '@/components/FormElements/Select/AsyncSelect';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { FormField } from '@/components/FormElements/FormField';
import { FormFieldProps } from '@/controllers/form/form.typedefs';

const getTechnologiesOptions = (
  technologies: TechnologyBaseFragment[],
) => technologies.map((technology) => ({
  label: technology.name,
  value: `${technology.id}`,
}));

interface FieldProps {
  technologies: SelectOption[]
}

type Props = FormFieldProps<number[], FieldProps> & {
  technologies: TechnologyBaseFragment[]
}

export const TechnologiesFilterInput: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Form, Namespaces.Candidates]);
  const { getValues, technologies } = props;

  const {
    refetch: refetchTechnologies,
  } = useTechnologiesQuery();

  const loadOptions = debounce(
    async (query: string) => {
      const requiredTechnologiesIds = getValues('technologies').map(
        (tech) => +tech.value,
      );

      const { data: refetchedData } = await refetchTechnologies({
        query,
        requiredTechnologiesIds,
      });

      return getTechnologiesOptions(refetchedData.technologies ?? []);
    },
    250,
  );

  return (
    <FormField
      disabled={props.formDisabled}
      label={{
        for: 'technologies',
        text: t(`${Namespaces.Candidates}:top_technologies_label`),
      }}
      renderInput={(inputProps) => (
        <AsyncSelect
          {...inputProps}
          control={props.control}
          id="technologies"
          name="technologies"
          loadOptions={loadOptions}
          defaultOptions={getTechnologiesOptions(technologies)}
          isMulti
          isDisabled={props.formDisabled}
          placeholder={t(`${Namespaces.Form}:technologies_label`)}
          noOptionsMessage={(options) => t(`${Namespaces.Form}:technologies_no_options`, {
            technology: options.inputValue,
          })}
        />
      )}
    />
  );
};
