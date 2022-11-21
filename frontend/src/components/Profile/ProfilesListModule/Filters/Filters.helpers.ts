import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import {
  FormDataValues, LocationState,
  SalaryRange, TimezoneRange,
} from '@/components/Profile/ProfilesListModule/Filters';
import { PublicProfilesParameters } from '@/controllers/graphql/generated';
import { LocationTypes } from '@/controllers/router/router.constants';

export const getIds = (options: SelectOption[]) => options.map(
  (el) => Number(el.value),
);

export const getNames = (options: SelectOption[]) => options.map(
  (el) => el.label,
);
export const getPublicProfilesParams = (
  props: FormDataValues,
  locationsState: LocationState,
) => {
  const searchParams: PublicProfilesParameters = {};

  const {
    technologies, timezoneRange,
    timezoneReverseMode, specializations,
    jobExperiences, salaryRange,
    englishLevels, locations,
  } = props;

  if (specializations && specializations.length) {
    searchParams.specializations = getNames(specializations);
  }

  if (technologies && technologies.length) {
    searchParams.technologiesIds = getIds(technologies);
  }

  if (jobExperiences) {
    searchParams.experienceIds = [+jobExperiences.value];
  }

  if (englishLevels) {
    searchParams.englishLevelIds = [+englishLevels.value];
  }

  if (salaryRange) {
    const [min, max] = salaryRange;

    if (min !== SalaryRange.Min) {
      searchParams.salaryFrom = min;
    }

    if (max !== SalaryRange.Max) {
      searchParams.salaryTo = max;
    }
  }

  if (locations && locations.length) {
    const cities: SelectOption[] = [];
    const countries: SelectOption[] = [];

    locations.forEach((location) => {
      if (locationsState[location.label] === LocationTypes.Country) {
        countries.push(location);
      }

      if (locationsState[location.label] === LocationTypes.City) {
        cities.push(location);
      }
    });

    if (cities.length) {
      searchParams.cities = [...new Set(getNames(cities))];
    }

    if (countries.length) {
      searchParams.countries = [...new Set(getNames(countries))];
    }
  }

  if (timezoneRange) {
    const [min, max] = timezoneRange;

    if (min !== TimezoneRange.Min) {
      searchParams.timezoneFrom = min;
    }

    if (max !== TimezoneRange.Max) {
      searchParams.timezoneTo = max;
    }

    if (searchParams.timezoneTo && searchParams.timezoneFrom) {
      searchParams.timezoneReverseMode = timezoneReverseMode;
    }
  }

  return searchParams;
};
