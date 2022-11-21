import React, {
  FC, useCallback, useEffect, useState, useMemo,
} from 'react';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import styles from '@/components/Profile/ProfilesListModule/Filters/Filters.module.scss';
import { SalaryRange } from '@/components/Profile/ProfilesListModule/Filters/Filters.constants';
import 'rc-slider/assets/index.css';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { RangeSlider } from '@/components/Profile/ProfilesListModule/Filters/RangeSlider';
import { FormField } from '@/components/FormElements/FormField';
import { Switcher, Switches } from '@/components/Switcher';
import { useSalaryRangeTitles } from '@/controllers/candidateProfile/candidateProfile.hooks/useSalaryRangeValues';
import { Features } from '@/controllers/features/features.constants';

interface FieldProps {
  salaryRange: number[]
}

export interface SliderValues {
  salaryFrom: number;
  salaryTo: number;
}

export enum SalaryMultipliers {
  Monthly = 1,
  Annual = 12,
}

type Props = FormFieldProps<number[], FieldProps> & {
  initialMultiplier?: string;
}

export const SalaryFilterInput: FC<Props> = (props) => {
  const switcherFeature = useFeature(Features.FiltersSalarySwitcher);

  const isSwitcherEnabled = useMemo(
    () => switcherFeature.isEnabled(),
    [switcherFeature],
  );

  const { t } = useTranslation(Namespaces.Form);
  const {
    setValue, initialValue,
    control, initialMultiplier,
  } = props;

  const [
    salaryMultiplier, setSalaryMultiplier,
  ] = useState<SalaryMultipliers | number>(
    switcherFeature.isEnabled()
      ? SalaryMultipliers.Annual
      : SalaryMultipliers.Monthly,
  );

  const setAnnualSalary = useCallback(
    () => {
      setSalaryMultiplier(SalaryMultipliers.Annual);
    },
    [],
  );

  const setMonthlySalary = useCallback(
    () => {
      setSalaryMultiplier(SalaryMultipliers.Monthly);
    },
    [],
  );

  useEffect(() => {
    if (isSwitcherEnabled) {
      if (
        salaryMultiplier === SalaryMultipliers.Monthly
      ) {
        setValue('salaryMultiplier', `${salaryMultiplier}`);
      } else {
        setValue('salaryMultiplier', '');
      }
    }
  }, [setValue, salaryMultiplier, isSwitcherEnabled]);

  useEffect(() => {
    if (isSwitcherEnabled) {
      if (
        initialMultiplier === `${SalaryMultipliers.Monthly}`
      ) {
        setSalaryMultiplier(SalaryMultipliers.Monthly);
      } else {
        setSalaryMultiplier(SalaryMultipliers.Annual);
      }
    }
  }, [initialMultiplier, isSwitcherEnabled]);

  const [sliderValues, setSliderValues] = useState<SliderValues>({
    salaryFrom: SalaryRange.Min,
    salaryTo: SalaryRange.Max,
  });

  const {
    valueFrom, valueTo,
  } = useSalaryRangeTitles(sliderValues, salaryMultiplier);

  useEffect(() => {
    if (initialValue) {
      const [salaryFrom, salaryTo] = initialValue;

      setSliderValues({
        salaryFrom,
        salaryTo,
      });

      setValue('salaryRange', [salaryFrom, salaryTo]);
    }
  }, [initialValue, setValue]);

  const handleSliderChange = useCallback((values: number[]) => {
    const [salaryFrom, salaryTo] = values;

    setSliderValues({
      salaryFrom,
      salaryTo,
    });
  }, []);

  useEffect(() => {
    setValue('salaryRange', [
      sliderValues.salaryFrom,
      sliderValues.salaryTo,
    ], {
      shouldDirty: true,
    });
  }, [setValue, sliderValues]);

  return (
    <FormField
      className={styles.sliderContainer}
      disabled={props.formDisabled}
      label={{
        for: 'salary-range',
        text: t(`${Namespaces.Form}:salary_label`),
      }}
      renderInput={(inputProps) => (
        <>
          {isSwitcherEnabled && (
            <Switcher
              className='mb-8'
              primaryClickHandler={setAnnualSalary}
              secondaryClickHandler={setMonthlySalary}
              buttonsTexts={[
                t(`${Namespaces.Form}:switcher_button_annual`),
                t(`${Namespaces.Form}:switcher_button_monthly`),
              ]}
              initiallyActive={salaryMultiplier === SalaryMultipliers.Monthly
                ? Switches.Secondary
                : Switches.Primary}
            />
          )}

          <div className={styles.sliderValuesArea}>
            {`${valueFrom}${valueTo}`}
          </div>
          <RangeSlider
            {...inputProps}
            control={control}
            name="salaryRange"
            id="salary-range"
            className="mt-20"
            defaultValue={[sliderValues.salaryFrom, sliderValues.salaryTo]}
            value={[sliderValues.salaryFrom, sliderValues.salaryTo]}
            step={salaryMultiplier === SalaryMultipliers.Annual
              ? SalaryRange.StepAnnual
              : SalaryRange.Step}
            min={SalaryRange.Min}
            max={SalaryRange.Max}
            handleSliderChange={handleSliderChange}
          />
        </>
      )}
    />
  );
};
