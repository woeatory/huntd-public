import React, {
  Dispatch,
  FC, SetStateAction, useCallback, useEffect, useMemo, useState,
} from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { TimezoneRange } from '@/components/Profile/ProfilesListModule/Filters/Filters.constants';
import 'rc-slider/assets/index.css';
import { RangeSlider } from '@/components/Profile/ProfilesListModule/Filters/RangeSlider';
import { FormField } from '@/components/FormElements/FormField';
import FilterStyles from '@/components/Profile/ProfilesListModule/Filters/Filters.module.scss';
import { Toggle } from '@/components/Base/ToggleSwitch';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from './TimezoneFilterInput.module.scss';
import RangeSliderStyles from './RangeSlider.module.scss';

const TimezoneInteractiveMap = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ProfilesListModule/Filters/TimezoneInteractiveMap');

    return mod.TimezoneInteractiveMap;
  },
  {
    ssr: false,
  },
);

interface FieldProps {
  timezoneRange: number[]
}

interface Props {
  isRangedOutside: boolean;
  setLocationState?: Dispatch<SetStateAction<Record<string, any>>>
}

interface SliderValues {
  timezoneFrom: number;
  timezoneTo: number;
}

type TimezoneFilterInputProps = FormFieldProps<number[] | null, FieldProps>
  & Props;

export const TimezoneFilterInput: FC<TimezoneFilterInputProps> = (props) => {
  const {
    setValue,
    control,
    isRangedOutside,
    initialValue,
    setLocationState,
  } = props;

  const { t } = useTranslation([Namespaces.Form, Namespaces.Timezones]);

  const [sliderValues, setSliderValues] = useState<SliderValues>({
    timezoneFrom: TimezoneRange.Min,
    timezoneTo: TimezoneRange.Max,
  });

  const [toggle, setToggle] = useState(true);

  const [valueFrom, valueTo] = useMemo(
    () => [
      sliderValues.timezoneFrom,
      sliderValues.timezoneTo,
    ],
    [sliderValues],
  );

  const timezoneFromName = useMemo(() => (
    t(`${Namespaces.Timezones}:timezone_code${valueFrom}`)
  ), [valueFrom, t]);

  const timezoneToName = useMemo(() => (
    t(`${Namespaces.Timezones}:timezone_code${valueTo}`)
  ), [valueTo, t]);

  useEffect(() => {
    if (initialValue) {
      const [timezoneFrom, timezoneTo] = initialValue;

      setSliderValues({
        timezoneFrom,
        timezoneTo,
      });
    }
  }, [initialValue]);

  const handleSliderChange = useCallback((values: number[]) => {
    const [timezoneFrom, timezoneTo] = values;

    setSliderValues({
      timezoneFrom,
      timezoneTo,
    });

    if (setLocationState) {
      setLocationState((prev) => ({
        ...prev,
        timezoneFrom,
        timezoneTo,
      }));
    }
  }, [setSliderValues, setLocationState]);

  useEffect(() => {
    const { timezoneFrom, timezoneTo } = sliderValues;

    setValue('timezoneRange', [
      timezoneFrom,
      timezoneTo,
    ], {
      shouldDirty: true,
    });
  }, [sliderValues, setValue]);

  const handleToggleChange = useCallback(() => {
    setToggle((value) => !value);
  }, []);

  return (
    <FormField
      className={FilterStyles.sliderContainer}
      disabled={props.formDisabled}
      renderInput={(inputProps) => (
        <>
          <div className={cn('mb-8', styles.mapToggle)}>
            <p className={styles.toggleAction}>
              {t(`${Namespaces.Form}:show_map`)}
            </p>
            <Toggle
              toggle={toggle}
              handleToggleChange={handleToggleChange}
            />
          </div>

          <div className={cn(
            FilterStyles.sliderValuesArea,
            styles.sliderValues,
            'mb-8',
          )}
          >
            {`[${valueFrom} ${timezoneFromName}] - [${valueTo} ${timezoneToName}]`}
          </div>

          {toggle && (
            <TimezoneInteractiveMap
              timezoneFrom={initialValue ? initialValue[0] : TimezoneRange.Min}
              timezoneTo={initialValue ? initialValue[1] : TimezoneRange.Max}
              isRangedOutside={isRangedOutside}
            />
          )}

          <RangeSlider
            {...inputProps}
            control={control}
            name="timezoneRange"
            id="timezone-range"
            className={cn('mt-24', { [RangeSliderStyles.sliderOut]: isRangedOutside })}
            defaultValue={[sliderValues.timezoneFrom, sliderValues.timezoneTo]}
            value={[sliderValues.timezoneFrom, sliderValues.timezoneTo]}
            step={TimezoneRange.Step}
            min={TimezoneRange.Min}
            max={TimezoneRange.Max}
            handleSliderChange={handleSliderChange}
          />
        </>
      )}
    />
  );
};
