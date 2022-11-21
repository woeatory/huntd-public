import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { FormField } from '@/components/FormElements/FormField';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import {
  EnglishLevelBaseFragment,
  useEnglishLevelsQuery,
} from '@/controllers/graphql/generated';
import { i18n } from '@/controllers/i18n/i18n.client';
import { Select } from '@/components/FormElements/Select';
import { FormFieldProps } from '@/controllers/form/form.typedefs';

interface FieldProps {
  englishLevel: SelectOption | null
}

type Props = FormFieldProps<EnglishLevelBaseFragment | null, FieldProps>

export const getEnglishLevelsOptions = (
  englishLevels: EnglishLevelBaseFragment[],
) => englishLevels.map((englishLevel) => ({
  label: i18n.t(`${Namespaces.Form}:${englishLevel.slug}`),
  value: `${englishLevel.id}`,
}));

export const ProfileEnglishLevelInput: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Form]);
  const { initialValue, setValue } = props;

  // TODO: custom hook useEnglishLevels
  const englishLevelsQueryResult = useEnglishLevelsQuery();

  const englishLevels = useMemo(
    () => englishLevelsQueryResult.data?.englishLevels ?? [],
    [englishLevelsQueryResult],
  );

  useEffect(() => {
    if (initialValue) {
      setValue('englishLevel',
        {
          label: t<string>(`${Namespaces.Form}:${initialValue.slug}`),
          value: `${initialValue.id}`,
        });
    }
  }, [initialValue, t, setValue]);

  return (
    <FormField
      disabled={props.formDisabled}
      label={{
        for: 'english-level',
        text: t(`${Namespaces.Form}:english_level_label`),
      }}
      error={props.errors.englishLevel}
      renderInput={(inputProps) => (
        <Select
          {...inputProps}
          control={props.control}
          name="englishLevel"
          id="english-level"
          options={getEnglishLevelsOptions(englishLevels || [])}
          isDisabled={props.formDisabled}
          validation={{
            required: {
              value: true,
              message: 'english_level_is_required',
            },
          }}
          placeholder={t(`${Namespaces.Form}:english_level_label`)}
        />
      )}
    />
  );
};
