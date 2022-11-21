import React, {
  FC, useState, useEffect, useRef, Dispatch, SetStateAction, useCallback,
} from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import getConfig from 'next/config';
import { Libraries } from '@react-google-maps/api/src/utils/make-load-script-url';
import Async from 'react-select/async';
import { OptionTypeBase } from 'react-select';
import { StylesConfig } from 'react-select/src/styles';
import { AsyncSelectUi } from '@/components/FormElements/Select';
import { CustomSelectProps, SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';
import CitySelectModule from '@/components/Profile/CandidateProfileModule/JobRequirementsForm/CitySelectUi.module.scss';
import { LocationState } from '@/components/Profile/ProfilesListModule/Filters';
import { LocationTypes } from '@/controllers/router/router.constants';

const { publicRuntimeConfig = {} } = getConfig() || {};
const {
  GOOGLE_API_KEY,
} = publicRuntimeConfig;

const libraries = ['places'];

interface Props {
  locationState: LocationState;
  setLocationState: Dispatch<SetStateAction<LocationState>>;
}

type LocationProps = CustomSelectProps<SelectOption[]> & Props;

export const LocationFilterSelectUi: FC<LocationProps> = (props) => {
  const {
    initialValue,
    value,
    onChange,
    setLocationState,
    locationState,
  } = props;

  const selectCustomStyles: StylesConfig = {
    multiValue: (styles, { data }) => {
      const backgroundColor = (
        locationState[data.label] === LocationTypes.Country
      )
        ? '#e9f8ff !important'
        : '#feeeeb';

      return { ...styles, backgroundColor };
    },
    multiValueRemove: (styles, { data }) => {
      const isCountry = locationState[data.label] === LocationTypes.Country;

      const backgroundColor = isCountry
        ? '#e9f8ff !important'
        : '#feeeeb';

      const color = isCountry
        ? '#211e1c !important'
        : 'currentColor';

      return { ...styles, backgroundColor, color };
    },
  };

  const [
    autoCompleteInstance,
    setInstance,
  ] = useState<google.maps.places.Autocomplete | null>(null);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const inputRef = useRef<Async<OptionTypeBase> | null>(null);

  useEffect(() => {
    if (initialValue && onChange) {
      setOptions(initialValue);
      onChange(initialValue);
    }
  }, [onChange, initialValue]);

  useEffect(() => {
    if (value === null && onChange) {
      setLocationState({});
      setOptions([]);
      onChange([]);

      return;
    }

    if (!value || typeof value === 'string') {
      return;
    }

    let filteredValue = value as SelectOption[];

    filteredValue = filteredValue.filter(
      (item) => item.label.trim() && item.value,
    );

    setOptions(filteredValue);
  }, [value, onChange, setLocationState]);

  const handleLoad = useCallback((instance) => {
    setInstance(instance);
  }, []);

  const handlePlaceChange = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.blur();
      inputRef.current.focus();
    }

    const location = autoCompleteInstance?.getPlace();

    if (
      location
      && !options.some((place) => place.value === location.place_id)
      && location.place_id
    ) {
      let filteredPlaces: SelectOption[] = [];

      const placeTypes = location.types ? location.types : [];
      const isSupportedLocation = (
        placeTypes.includes(LocationTypes.Country)
        || placeTypes.includes(LocationTypes.City)
      );

      if (!isSupportedLocation) {
        return;
      }

      setOptions((prevPlaces) => {
        filteredPlaces = prevPlaces
          .filter((place) => place.value !== location.name);

        return [
          ...filteredPlaces,
          {
            value: location.place_id as string,
            label: location.name,
          },
        ];
      });

      setLocationState((prev) => ({
        ...prev,
        [location.name]: placeTypes[0],
      }));

      if (onChange) {
        setLocationState((prev) => ({
          ...prev,
          [location.name]: placeTypes[0],
        }));

        onChange([
          ...filteredPlaces,
          {
            value: location.place_id as string,
            label: location.name,
          },
        ]);
      }
    }
  }, [autoCompleteInstance, onChange, options, setLocationState]);

  return (
    <div className="mb-24">
      <LoadScript
        googleMapsApiKey={GOOGLE_API_KEY}
        libraries={libraries as Libraries}
        language='en'
      >
        <Autocomplete
          className={CitySelectModule.select}
          onLoad={handleLoad}
          onPlaceChanged={handlePlaceChange}
          types={
            ['(regions)']
          }
        >
          <AsyncSelectUi
            onChange={() => Promise.resolve()}
            styles={selectCustomStyles}
            loadOptions={() => Promise.resolve()}
            noOptionsMessage={() => null}
            {...props}
            isMulti
            isDisabled={props.disabled}
            value={options}
            ref={inputRef}
            inputId={props.id}
          />
        </Autocomplete>
      </LoadScript>
    </div>
  );
};

export const LocationFilterSelect = withHookFormController({})(
  LocationFilterSelectUi,
);
