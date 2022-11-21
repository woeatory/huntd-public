import React, { FC, useEffect, useMemo } from 'react';
import { useEnglishLevelsQuery, EnglishLevelBaseFragment } from '@/controllers/graphql/generated';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { FormField } from '@/components/FormElements/FormField';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { i18n } from '@/controllers/i18n/i18n.client';
import { Select } from '@/components/FormElements/Select';

interface FieldProps {
  englishLevels: SelectOption
}

type Props = FormFieldProps<number, FieldProps>

const getEnglishLevelsOptions = (
  englishLevels: EnglishLevelBaseFragment[],
) => englishLevels.map((englishLevel) => ({
  label: i18n.t(`${Namespaces.Candidates}:${englishLevel.slug}`),
  value: `${englishLevel.id}`,
}));

export const EnglishLevelsFilterInput: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Form, Namespaces.Candidates]);
  const { initialValue, setValue } = props;

  const englishLevelsQueryResult = useEnglishLevelsQuery();

  const englishLevels = useMemo(
    () => englishLevelsQueryResult.data?.englishLevels ?? [],
    [englishLevelsQueryResult],
  );

  useEffect(() => {
    if (initialValue && englishLevels.length) {
      const englishLvl = englishLevels.find(
        (level) => level.id === initialValue,
      );

      if (englishLvl) {
        const option = {
          label: t<string>(`${Namespaces.Candidates}:${englishLvl.slug}`),
          value: `${englishLvl.id}`,
        };

        setValue('englishLevels', option);
      }
    }
  }, [initialValue, t, setValue, englishLevels]);

  return (
    <FormField
      disabled={props.formDisabled}
      label={{
        for: 'english-levels',
        text: t(`${Namespaces.Form}:english_level_label`),
      }}
      renderInput={(inputProps) => (
        <Select
          isClearable
          {...inputProps}
          control={props.control}
          id="english-levels"
          name="englishLevels"
          isDisabled={props.formDisabled}
          options={getEnglishLevelsOptions(englishLevels)}
          placeholder={t(`${Namespaces.Form}:english_level_label`)}
        />
      )}
    />
  );
};
