import queryString from 'query-string';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { SalaryMultipliers } from '@/components/Profile/ProfilesListModule/Filters/SalaryFilterInput';
import { SalaryRange, TimezoneRange } from '@/components/Profile/ProfilesListModule/Filters';
import { SearchRoutes, Routes } from '@/controllers/router/router.constants';

interface GetUrlProps {
  cities: SelectOption[];
  countries: SelectOption[];
  specializations: SelectOption[];
  technologies: SelectOption[];
  salaryRange: number[];
  timezoneRange: number[];
  timezoneReverseMode: boolean;
  englishLevels: SelectOption;
  jobExperiences: SelectOption;
  employmentTypes: string[];
  salaryMultiplier: SalaryMultipliers;
  candidateLocation: string;
}

export type ParamsStore = Record<string, string[] | number[] | string | number>

export const getUrlParts = ({
  cities, countries, specializations,
  salaryMultiplier, technologies,
  salaryRange, englishLevels,
  jobExperiences, employmentTypes,
  timezoneRange, timezoneReverseMode,
  candidateLocation,
}: GetUrlProps): string => {
  const paramsStore: ParamsStore = {};
  let countriesPart = '';
  let citiesPart = '';
  let specializationsPart = '';

  // COUNTRIES PART

  if (countries && countries.length) {
    countriesPart = `/${countries
      .map((country) => country.label
        .toLowerCase()
        .replace(/[ ]/, '_'))
      .join(',')}`;
  }

  // CITIES PART

  if (cities && cities.length) {
    citiesPart = `/${cities
      .map((city) => city.label
        .toLowerCase()
        .replace(/[ ]/, '_'))
      .join(',')}`;
  }

  // SPECIALIZATIONS PART

  if (specializations) {
    specializationsPart = typeof specializations === 'string' || !specializations.length
      ? ''
      : `/${specializations.map((spec) => spec.label
        .toLowerCase()
        .trim()
        .replace(/[/]/g, '-')
        .replace(/[+]/g, 'plus')
        .replace(/[#]/, '-sharp')
        .replace(/[ ]/, '_'))
        .join(',')}`;
  }

  if ((!countriesPart)
    && ((cities && cities.length > 0)
    || (specializations && specializations.length > 0))
  ) {
    countriesPart = `/${SearchRoutes.AnyCountry}`;
  }

  if ((!citiesPart)
    && (specializations
    && specializations.length > 0)
  ) {
    citiesPart = `/${SearchRoutes.AnyCity}`;
  }

  if (!countriesPart && !citiesPart && !specializations) {
    countriesPart = '';
    citiesPart = '';
    specializationsPart = '';
  }

  // PARAMS PART

  if (technologies && technologies.length) {
    paramsStore[SearchRoutes.Technologies] = technologies
      .map((technology) => technology.value);
  }

  if (salaryRange && salaryRange.length) {
    const [salaryFrom, salaryTo] = salaryRange;

    if (salaryFrom && salaryFrom > SalaryRange.Min) {
      paramsStore[SearchRoutes.SalaryFrom] = salaryFrom;
    }

    if (salaryTo && salaryTo < SalaryRange.Max) {
      paramsStore[SearchRoutes.SalaryTo] = salaryTo;
    }
  }

  if (timezoneReverseMode) {
    paramsStore[SearchRoutes.TimezoneReverseMode] = 1;
  }

  if (timezoneRange && timezoneRange.length) {
    const [timezoneFrom, timezoneTo] = timezoneRange;

    if (timezoneFrom > TimezoneRange.Min) {
      paramsStore[SearchRoutes.TimezoneFrom] = timezoneFrom;
    }

    if (timezoneTo < TimezoneRange.Max) {
      paramsStore[SearchRoutes.TimezoneTo] = timezoneTo;
    }

    if (
      timezoneFrom === TimezoneRange.Min
      || timezoneTo === TimezoneRange.Max) {
      delete paramsStore[SearchRoutes.TimezoneReverseMode];
    }
  }

  if (englishLevels) {
    paramsStore[SearchRoutes.EnglishLevel] = englishLevels.value;
  }

  if (salaryMultiplier) {
    paramsStore[SearchRoutes.SalaryMultiplier] = salaryMultiplier;
  }

  if (candidateLocation) {
    paramsStore[SearchRoutes.CandidateLocation] = candidateLocation;
  }

  if (jobExperiences) {
    paramsStore[SearchRoutes.JobExperience] = jobExperiences.value;
  }

  if (employmentTypes && employmentTypes.length) {
    paramsStore[SearchRoutes.EmploymentType] = employmentTypes;
  }

  const resultUrl = queryString.stringifyUrl({
    url: `${Routes.Candidates}${countriesPart}${citiesPart}${specializationsPart}`,
    query: paramsStore,
  },
  { arrayFormat: 'comma' });

  return resultUrl;
};
