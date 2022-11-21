import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { LocationState, SalaryRange, TimezoneRange } from '@/components/Profile/ProfilesListModule/Filters';
import { LocationTypes } from '@/controllers/router/router.constants';

interface GetFiltersUsedProps {
  values: {
    locations: SelectOption[];
    specializations: SelectOption[];
    technologies: SelectOption[];
    salaryRange: number[];
    timezoneRange: number[];
    englishLevels: SelectOption;
    jobExperiences: SelectOption;
    timezoneReverseMode: boolean;
  };
  locationState: LocationState;
}

const getStringWithValues = (values: SelectOption[]) => values
  .map((item) => item.label)
  .join(',');

const getValue = (value: SelectOption) => value.label;

export const useGetUsedFilters = (
  { values, locationState }: GetFiltersUsedProps,
) => {
  const {
    locations, specializations,
    technologies, salaryRange,
    englishLevels, jobExperiences,
    timezoneRange, timezoneReverseMode,
  } = values;

  const filtersUsed: Record<string, string | boolean> = {};
  const cities: SelectOption[] = [];
  const countries: SelectOption[] = [];

  if (locations && locations.length) {
    locations.forEach((location) => {
      if (locationState[location.label] === LocationTypes.Country) {
        countries.push(location);
      } else {
        cities.push(location);
      }
    });
  }

  if (cities && cities.length) {
    filtersUsed.cities = getStringWithValues(cities);
  }

  if (countries && countries.length) {
    filtersUsed.countries = getStringWithValues(countries);
  }

  if (specializations && specializations.length) {
    filtersUsed.specializations = getStringWithValues(specializations);
  }

  if (technologies && technologies.length) {
    filtersUsed.technologies = getStringWithValues(technologies);
  }

  if (englishLevels) {
    filtersUsed.englishLevels = getValue(englishLevels);
  }

  if (jobExperiences) {
    filtersUsed.jobExperiences = getValue(jobExperiences);
  }

  if (salaryRange && salaryRange.length) {
    const [salaryFrom, salaryTo] = salaryRange;

    if (salaryFrom && salaryFrom > SalaryRange.Min) {
      filtersUsed.salaryFrom = `${salaryFrom}`;
    }

    if (salaryTo && salaryTo < SalaryRange.Max) {
      filtersUsed.salaryTo = `${salaryTo}`;
    }
  }

  if (timezoneRange && timezoneRange.length) {
    const [timezoneFrom, timezoneTo] = timezoneRange;

    if (!Number.isNaN(Number(timezoneFrom))
      && timezoneFrom > TimezoneRange.Min) {
      filtersUsed.timezoneFrom = `${timezoneFrom}`;
    }

    if (!Number.isNaN(Number(timezoneTo)) && timezoneTo < TimezoneRange.Max) {
      filtersUsed.timezoneTo = `${timezoneTo}`;
    }
  }

  if (timezoneReverseMode) {
    filtersUsed.timezoneReverseMode = Boolean(timezoneReverseMode);
  }

  return filtersUsed;
};
