import React, {
  FC, useState, useEffect, useRef, Dispatch, SetStateAction,
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
import { CandidateProfileCity, CandidateProfileCityInput, CityTypes } from '@/controllers/graphql/generated';
import CitySelectModule from '@/components/Profile/CandidateProfileModule/JobRequirementsForm/CitySelectUi.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

const { publicRuntimeConfig = {} } = getConfig() || {};
const {
  GOOGLE_API_KEY,
} = publicRuntimeConfig;

const libraries = ['places'];

const getLocationOption = (
  value: CandidateProfileCity,
): SelectOption => ({
  label: value.cityName,
  value: value.cityId,
});

const getLocationData = (
  value: CandidateProfileCity,
): CandidateProfileCityInput => ({
  cityId: value.cityId,
  cityName: value.cityName,
  cityCountryName: value.cityCountryName,
  cityCountrySlug: value.cityCountrySlug,
  cityTimezone: value.cityTimezone,
  type: value.type,
});

interface FieldProps {
  location: CandidateProfileCityInput;
}

interface LocationState {
  option: SelectOption | null
  data: CandidateProfileCityInput | null
}

type Props = FormFieldProps<
  CandidateProfileCity,
  FieldProps
> & {
  setIsDirty: Dispatch<SetStateAction<{ isDirty: boolean }>>
  isDirty: boolean;
}

export const LocationSelect: FC<Props> = React.memo((props) => {
  const { t } = useTranslation([Namespaces.Form]);
  const {
    initialValue, setValue, errors,
    getValues, setIsDirty, isDirty,
    clearErrors,
  } = props;

  const [initialLocation] = useState(initialValue ?? null);

  const [
    autoCompleteInstance,
    setInstance,
  ] = useState<google.maps.places.Autocomplete | null>(null);

  const [
    locationState,
    setLocationState,
  ] = useState<LocationState>({
    option: null,
    data: null,
  });

  const inputRef = useRef<Async<OptionTypeBase> | null>(null);

  useEffect(() => {
    if (!isDirty) {
      if (initialLocation) {
        const initialOption = getLocationOption(initialLocation);
        const initialData = getLocationData(initialLocation);

        setLocationState({
          option: initialOption,
          data: initialData,
        });
      } else {
        setLocationState({
          option: null,
          data: null,
        });
      }
    }
  }, [initialLocation, isDirty]);

  useEffect(() => {
    const { data: locationData } = locationState;

    setValue('location', locationData);
  }, [locationState, setValue, getValues, setIsDirty]);

  return (
    <FormField
      disabled={props.formDisabled}
      label={{
        for: 'location',
        text: t(`${Namespaces.Form}:location_label`),
      }}
      error={errors.location as any} // TODO: remove any
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
              clearErrors('location');

              if (inputRef && inputRef.current) {
                inputRef.current.blur();
                inputRef.current.focus();
              }

              setIsDirty({ isDirty: true });
              const { option } = locationState;

              const city = autoCompleteInstance?.getPlace();

              if (
                city
                && city.place_id
                && option?.value !== city.place_id
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
                  type: CityTypes.CandidateCity,
                };

                setLocationState(({
                  option: {
                    value: city.place_id as string,
                    label: city.name,
                  },
                  data: preparedCity,
                }));

                inputRef.current?.blur();
              }
            }}
            types={
              ['(cities)']
            }
          >
            <AsyncSelectUi
              {...inputProps}
              name="location"
              id="location"
              loadOptions={() => Promise.resolve()}
              noOptionsMessage={() => null}
              value={locationState.option}
              ref={inputRef}
              inputId="location"
              isDisabled={props.formDisabled}
              placeholder={t(`${Namespaces.Form}:location_select_placeholder`)}
            />
          </Autocomplete>
        </LoadScript>
      )}
    />
  );
});
