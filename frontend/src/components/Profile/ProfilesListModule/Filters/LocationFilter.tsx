import React, {
  Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo,
} from 'react';
import 'rc-slider/assets/index.css';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { UseFormMethods } from 'react-hook-form';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Tooltip } from '@/components/Base/Tooltip';
import { TooltipPositions } from '@/controllers/tooltip/tooltip.constants';
import { Switcher, Switches } from '@/components/Switcher';
import { FormField } from '@/components/FormElements/FormField';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { LocationFilterType } from '@/controllers/router/router.constants';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { FormDataValues, LocationState } from '@/components/Profile/ProfilesListModule/Filters/Filters';
import { TimezoneRange } from '@/components/Profile/ProfilesListModule/Filters/Filters.constants';
import styles from './LocationFilter.module.scss';

const TimezoneFilterInput = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ProfilesListModule/Filters/TimezoneFilterInput');

    return mod.TimezoneFilterInput;
  },
  {
    ssr: false,
  },
);

const TimezoneRangeCheckbox = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ProfilesListModule/Filters/TimezoneRangeCheckbox');

    return mod.TimezoneRangeCheckbox;
  },
  {
    ssr: false,
  },
);

const LocationFilterSelect = dynamic(
  async () => {
    const mod = await import('@/components/Profile/CandidateProfileModule/JobRequirementsForm/LocationFilterSelectUi');

    return mod.LocationFilterSelect;
  },
  {
    ssr: false,
  },
);

type Props = {
  initialTimezoneRange: number[];
  initialTimezoneReverseMode: boolean;
  isRangedOutside: boolean;
  locationsInitialValue: SelectOption[];
  isTimezoneFilter: boolean;
  locationState: LocationState;
  setLocationState: Dispatch<SetStateAction<LocationState>>;
  formMethods: UseFormMethods<FormDataValues>;
  formDisabled: boolean;
  firstSubscriptionMode?: boolean;
}

export const LocationFilter: FC<Props> = (props) => {
  const {
    initialTimezoneRange,
    initialTimezoneReverseMode,
    locationsInitialValue,
    isRangedOutside,
    setLocationState,
    isTimezoneFilter,
    locationState,
    formMethods,
    formDisabled,
    firstSubscriptionMode,
  } = props;

  const { setValue, control } = formMethods;

  const { t } = useTranslation([Namespaces.Form]);

  const setTimezoneFilter = useCallback(
    () => {
      if (firstSubscriptionMode) {
        setLocationState((prev) => ({
          ...prev,
          type: LocationFilterType.Timezone,
        }));
      }

      setValue('candidateLocation', '');
    },
    [setValue, firstSubscriptionMode, setLocationState],
  );

  const setCountryCityFilter = useCallback(
    () => {
      if (firstSubscriptionMode) {
        setLocationState((prev) => ({
          ...prev,
          type: LocationFilterType.CityCountry,
        }));
      }

      setValue('candidateLocation', LocationFilterType.CityCountry);
    },
    [setValue, firstSubscriptionMode, setLocationState],
  );

  const isTimezoneRangePicked = useMemo(() => {
    const timezoneFrom = Number(initialTimezoneRange[0]);
    const timezoneTo = Number(initialTimezoneRange[1]);

    return (
      timezoneFrom !== TimezoneRange.Min && timezoneTo !== TimezoneRange.Max
    );
  }, [initialTimezoneRange]);

  useEffect(() => {
    if (isTimezoneFilter) {
      setValue('locations', []);
    } else {
      setValue('timezoneRange', [TimezoneRange.Min, TimezoneRange.Max]);
      setValue('timezoneReverseMode', false);
    }
  }, [isTimezoneFilter, setValue]);

  return (
    <>
      <div className={cn('mb-8', styles.locationTitle)}>
        <p className={cn('c-gray', typography.smallText)}>
          {t(`${Namespaces.Form}:candidate_location_label`)}
        </p>
        <div className={styles.locationTooltip}>
          <Tooltip
            text={t(`${Namespaces.Form}:candidate_location_tooltip`)}
            position={TooltipPositions.Top}
          />
        </div>
      </div>

      <Switcher
        className='mb-16'
        primaryClickHandler={setTimezoneFilter}
        secondaryClickHandler={setCountryCityFilter}
        buttonsTexts={[
          t(`${Namespaces.Form}:timezone_switcher`),
          t(`${Namespaces.Form}:country_city_switcher`),
        ]}
        initiallyActive={isTimezoneFilter
          ? Switches.Primary
          : Switches.Secondary}
      />

      {isTimezoneFilter
        ? (
          <>
            <TimezoneFilterInput
              formDisabled={formDisabled}
              initialValue={initialTimezoneRange}
              isRangedOutside={isRangedOutside}
              setLocationState={
                firstSubscriptionMode ? setLocationState : undefined
              }
              {...formMethods}
            />

            {isTimezoneRangePicked && (
              <div className="mt-24">
                <TimezoneRangeCheckbox
                  formDisabled={formDisabled}
                  initialValue={initialTimezoneReverseMode}
                  {...formMethods}
                />
              </div>
            )}
          </>
        )
        : (
          <div>
            <FormField
              disabled={formDisabled}
              renderInput={(inputProps) => (
                <LocationFilterSelect
                  {...inputProps}
                  initialValue={locationsInitialValue}
                  name="locations"
                  id="locations"
                  control={control}
                  placeholder={t(`${Namespaces.Form}:cities_countries_filter_placeholder`)}
                  locationState={locationState}
                  setLocationState={setLocationState}
                />
              )}
            />
          </div>
        )}
    </>
  );
};
