import React, {
  FC, useEffect, useCallback, useRef, useState,
} from 'react';
import debounce from 'debounce-promise';
import {
  TechnologyBaseFragment,
  useTechnologiesByNamesLazyQuery,
  useTechnologiesQuery,
  FlashMessageType,
} from '@/controllers/graphql/generated';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { AsyncSelect } from '@/components/FormElements/Select';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { FormField } from '@/components/FormElements/FormField';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { Tooltip } from '@/components/Base/Tooltip';
import { TooltipPositions } from '@/controllers/tooltip/tooltip.constants';
import { TechnologiesLimits } from '@/components/Profile/CandidateProfileModule/TechSkillsForm/constants';
import styles from '@/components/Profile/CandidateProfileModule/TechSkillsForm/ProfileTechnologiesInput.module.scss';

const getTechnologiesOptions = (
  technologies: TechnologyBaseFragment[],
) => technologies.map((technology) => ({
  label: technology.name,
  value: `${technology.id}`,
}));

interface FieldProps {
  technologies?: SelectOption[] | null
}

type Props = FormFieldProps<TechnologyBaseFragment[] | null, FieldProps>

export const ProfileTechnologiesInput: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Form]);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const flashMessage = useFlashMessage();
  const [
    getTechnologiesByNames,
    { data: parsedTechnologiesData },
  ] = useTechnologiesByNamesLazyQuery();
  const { initialValue, setValue, getValues } = props;
  const [selectedOptionsLength, setSelectedOptionsLength] = useState(0);

  const { refetch: refetchTechnologies } = useTechnologiesQuery();

  const handleInputChange = useCallback(async (e: string) => {
    if (e.includes(',') || e.includes('/')) {
      const validatedValue = e.split(',')
        .map((item) => item.split('/'))
        .flat()
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, TechnologiesLimits.Max);

      const uniqueValues = new Set(validatedValue);

      if (uniqueValues.size > 0) {
        await getTechnologiesByNames({
          variables: {
            names: [...uniqueValues],
          },
        });

        flashMessage.postMessage({
          variables: {
            type: FlashMessageType.Warning,
            heading: t(`${Namespaces.Profile}:pasted_technologies_heading`),
            text: t(`${Namespaces.Profile}:pasted_technologies_text`),
          },
        });
      }
    }
  }, [getTechnologiesByNames, flashMessage, t]);

  const loadOptions = debounce(
    async (query: string) => {
      if (selectedOptionsLength >= TechnologiesLimits.Max) {
        return null;
      }

      const { data } = await refetchTechnologies({
        query,
      });

      return getTechnologiesOptions(data?.technologies ?? []);
    },
    250,
  );

  useEffect(() => {
    const techs = parsedTechnologiesData?.technologiesByNames;

    if (techs?.length) {
      setValue('technologies', getTechnologiesOptions(techs));
      selectRef?.current?.blur();
    }
  }, [setValue, parsedTechnologiesData]);

  useEffect(() => {
    if (initialValue) {
      setValue('technologies', initialValue.map(
        (technology) => ({
          label: technology.name,
          value: `${technology.id}`,
        }),
      ));
    }
  }, [initialValue, setValue]);

  const noOptionsMessage = selectedOptionsLength >= TechnologiesLimits.Max
    ? t(`${Namespaces.Form}:technologies_limit_reached`)
    : null;

  return (
    <FormField
      disabled={props.formDisabled}
      className="mb-40"
      label={{
        for: 'technologies',
        text: t(`${Namespaces.Form}:top_technologies_label`),
      }}
      error={props.errors.technologies}
      renderLabelIcon={() => (
        <span className={styles.iconContainer}>
          <Tooltip
            text={t(`${Namespaces.Form}:technologies_tooltip_with_limit`, {
              minValue: TechnologiesLimits.Min,
              maxValue: TechnologiesLimits.Max,
            })}
            position={TooltipPositions.Top}
          />
        </span>
      )}
      renderInput={(inputProps) => (
        <AsyncSelect
          {...inputProps}
          control={props.control}
          selectRef={selectRef}
          closeMenuOnSelect
          validation={{
            validate: (selectValue) => {
              if (!selectValue || selectValue.length < TechnologiesLimits.Min) {
                return 'minimum_technologies';
              }

              if (selectValue.length > TechnologiesLimits.Max) {
                return 'maximum_technologies';
              }

              return true;
            },
          }}
          id="technologies"
          name="technologies"
          loadOptions={loadOptions}
          onKeyDown={() => {
            const values = getValues('technologies');

            if (values) {
              setSelectedOptionsLength(values.length);
            }
          }}
          onInputChange={handleInputChange}
          menuPlacement="top"
          isMulti
          noOptionsMessage={() => noOptionsMessage}
          isDisabled={props.formDisabled}
          placeholder={t(`${Namespaces.Form}:technologies_placeholder`)}
          components={{
            DropdownIndicator: () => null,
          }}
        />
      )}
    />
  );
};
