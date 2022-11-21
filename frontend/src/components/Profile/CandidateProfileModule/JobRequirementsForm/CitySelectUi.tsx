import React, {
  FC, useState, useEffect, useRef, Dispatch, SetStateAction, useMemo,
} from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import getConfig from 'next/config';
import { Libraries } from '@react-google-maps/api/src/utils/make-load-script-url';
import Async from 'react-select/async';
import { OptionTypeBase } from 'react-select';
import { FormField } from '@/components/FormElements/FormField';
import { AsyncSelectUi } from '@/components/FormElements/Select';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { CandidateProfileCity, CandidateProfileCityInput } from '@/controllers/graphql/generated';
import CitySelectModule from '@/components/Profile/CandidateProfileModule/JobRequirementsForm/CitySelectUi.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

const { publicRuntimeConfig = {} } = getConfig() || {};
const {
  GOOGLE_API_KEY,
} = publicRuntimeConfig;

const libraries = ['places'];

const getCitiesOptions = (
  value: CandidateProfileCity[],
) => value.map((city) => ({
  label: city.cityName,
  value: city.cityId,
}));

const getCitiesData = (
  value: CandidateProfileCity[],
): CandidateProfileCityInput[] => value.map((city) => ({
  cityId: city.cityId,
  cityName: city.cityName,
  cityCountryName: city.cityCountryName,
  cityCountrySlug: city.cityCountrySlug,
  cityTimezone: city.cityTimezone,
}));

interface FieldProps {
  citiesData?: CandidateProfileCityInput[];
}

interface CitiesState {
  options: SelectOption[]
  data: CandidateProfileCityInput[]
}

type Props = FormFieldProps<
  CandidateProfileCity[],
  FieldProps
> & {
  setIsDirty: Dispatch<SetStateAction<{ isDirty: boolean }>>
  isDirty: boolean;
}

export const CitySelect: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Form]);
  const {
    initialValue, setValue,
    getValues, setIsDirty, isDirty,
  } = props;

  const initialCities = useMemo(() => initialValue || [], [initialValue]);

  const [
    autoCompleteInstance,
    setInstance,
  ] = useState<google.maps.places.Autocomplete | null>(null);

  const [citiesState, setCitiesState] = useState<CitiesState>({
    options: [],
    data: [],
  });
  const inputRef = useRef<Async<OptionTypeBase> | null>(null);

  useEffect(() => {
    if (!isDirty) {
      const initialOptions = getCitiesOptions(initialCities);
      const initialData = getCitiesData(initialCities);

      setCitiesState({
        options: initialOptions,
        data: initialData,
      });
    }
  }, [initialCities, isDirty]);

  useEffect(() => {
    const { data: citiesData } = citiesState;

    setValue('citiesData', citiesData);
  }, [citiesState, setValue, getValues, setIsDirty]);

  const handleChange = (selectedOptions: SelectOption[]) => {
    setIsDirty({ isDirty: true });

    if (!selectedOptions) {
      setCitiesState({
        options: [],
        data: [],
      });

      return;
    }

    const selectedCitiesIds = selectedOptions
      .reduce((acc: Record<string, any>, option) => {
        Object.assign(acc, { [option.value]: true });

        return acc;
      },
      {});

    setCitiesState((prev) => ({
      options: selectedOptions,
      data: prev.data.filter((city) => selectedCitiesIds[city.cityId]),
    }));
  };

  return (
    <FormField
      disabled={props.formDisabled}
      label={{
        for: 'cities-data',
        text: t(`${Namespaces.Form}:cities_label`),
      }}
      renderInput={(inputProps) => (
        <LoadScript
          googleMapsApiKey={GOOGLE_API_KEY}
          libraries={libraries as Libraries}
          language='en'
        >
          <Autocomplete
            className={CitySelectModule.select}
            onLoad={(instance) => {
              setInstance(instance);
            }}
            onPlaceChanged={() => {
              if (inputRef && inputRef.current) {
                inputRef.current.blur();
                inputRef.current.focus();
              }

              setIsDirty({ isDirty: true });
              const { options } = citiesState;

              const city = autoCompleteInstance?.getPlace();

              if (
                city
                && !options.some((item) => item.value === city.place_id)
                && city.place_id
              ) {
                const countryInfo = city.address_components?.find(
                  (component) => component.types.includes('country')
                );

                let cityCountrySlug;
                let cityCountryName;

                if (countryInfo) {
                  cityCountrySlug = countryInfo.short_name;
                  cityCountryName = countryInfo.long_name;
                }

                const preparedCity: CandidateProfileCityInput = {
                  cityId: city.place_id,
                  cityName: city.name,
                  cityCountrySlug,
                  cityCountryName,
                  cityTimezone: city.utc_offset_minutes,
                };

                setCitiesState((prev) => ({
                  options: [
                    ...prev.options,
                    {
                      value: city.place_id as string,
                      label: city.name,
                    },
                  ],
                  data: [
                    ...prev.data,
                    preparedCity,
                  ],
                }));
              }
            }}
            types={
              ['(cities)']
            }
          >
            <AsyncSelectUi
              {...inputProps}
              name="citiesData"
              id="cities-data"
              noOptionsMessage={() => null}
              loadOptions={() => Promise.resolve()}
              onChange={
                (value) => handleChange(value as SelectOption[])
              }
              isMulti
              value={citiesState.options}
              ref={inputRef}
              inputId="cities-data"
              isDisabled={props.formDisabled}
              placeholder={t(`${Namespaces.Form}:cities_filter_placeholder`)}
            />
          </Autocomplete>
        </LoadScript>
      )}
    />
  );
};
