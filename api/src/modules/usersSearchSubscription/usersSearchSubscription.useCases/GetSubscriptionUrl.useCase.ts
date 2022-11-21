import queryString from 'query-string';
import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { CandidateProfileSearchParams } from '@/modules/candidateProfile/candidateProfile.typedefs';
import { SalaryRange, TimezoneRange } from '@/modules/candidateProfile/candidateProfile.constants';
import { SubscriptionUrlRoutes, LocationFilterType, CandidatesRoute } from '@/modules/usersSearchSubscription/usersSearchSubscription.constants';

export interface GetSubscriptionUrlUseCaseOptions {
  searchParams: CandidateProfileSearchParams;
}
export type GetSubscriptionUrlUseCaseResult = string;

type Options = GetSubscriptionUrlUseCaseOptions;
type Result = GetSubscriptionUrlUseCaseResult;

type ParamsStore = Record<string, string[] | number[] | string | number>;

export class GetSubscriptionUrlUseCase
  extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      searchParams: [{
        nested_object: {
          cities: { list_of: ['string', 'required'] },
          countries: { list_of: ['string', 'required'] },
          specializations: { list_of: ['string', 'required', 'to_uc'] },
          salaryFrom: ['positive_integer'],
          salaryTo: ['positive_integer'],
          timezoneFrom: ['integer'],
          timezoneTo: ['integer'],
          timezoneReverseMode: { default: false },
          searchQuery: ['string', 'to_lc'],
          experienceIds: { list_of: ['positive_integer', 'required'] },
          englishLevelIds: { list_of: ['positive_integer', 'required'] },
          employmentTypesIds: { list_of: ['positive_integer', 'required'] },
          technologiesIds: { list_of: ['positive_integer', 'required'] },
        },
      }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    let countriesPart = '';
    let citiesPart = '';
    let specializationsPart = '';
    const paramsStore: ParamsStore = {};

    const {
      cities, countries,
      specializations, technologiesIds,
      salaryFrom, salaryTo,
      timezoneTo, timezoneFrom,
      timezoneReverseMode, englishLevelIds,
      experienceIds, employmentTypesIds,
    } = options.searchParams;

    // COUNTRIES PART

    if (countries && countries.length) {
      countriesPart = `/${countries
        .map((country) => country
          .toLowerCase()
          .replace(/[ ]/, '_'))
        .join(',')}`;
    }

    // CITIES PART

    if (cities && cities.length) {
      citiesPart = `/${cities
        .map((city) => city
          .toLowerCase()
          .replace(/[ ]/, '_'))
        .join(',')}`;
    }

    // SPECIALIZATIONS PART

    if (specializations) {
      specializationsPart = typeof specializations === 'string' || !specializations.length
        ? ''
        : `/${specializations.map((spec) => spec
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
      countriesPart = `/${SubscriptionUrlRoutes.AnyCountry}`;
    }

    if ((!citiesPart)
      && (specializations
      && specializations.length > 0)
    ) {
      citiesPart = `/${SubscriptionUrlRoutes.AnyCity}`;
    }

    if (!countriesPart && !citiesPart && !specializations) {
      countriesPart = '';
      citiesPart = '';
      specializationsPart = '';
    }

    // PARAMS PART

    if (cities || countries) {
      paramsStore[SubscriptionUrlRoutes.CandidateLocation] = (
        LocationFilterType.CityCountry
      );
    }

    if (technologiesIds && technologiesIds.length) {
      paramsStore[SubscriptionUrlRoutes.Technologies] = technologiesIds;
    }

    if (salaryFrom || salaryTo) {
      if (salaryFrom && salaryFrom > SalaryRange.Min) {
        paramsStore[SubscriptionUrlRoutes.SalaryFrom] = `${salaryFrom}`;
      }

      if (salaryTo && salaryTo < SalaryRange.Max) {
        paramsStore[SubscriptionUrlRoutes.SalaryTo] = `${salaryTo}`;
      }
    }

    if (timezoneFrom || timezoneTo) {
      if (timezoneFrom && timezoneFrom > TimezoneRange.Min) {
        paramsStore[SubscriptionUrlRoutes.TimezoneFrom] = `${timezoneFrom}`;
      }

      if (timezoneTo && timezoneTo < TimezoneRange.Max) {
        paramsStore[SubscriptionUrlRoutes.TimezoneTo] = `${timezoneTo}`;
      }
    }

    if (timezoneReverseMode) {
      paramsStore[SubscriptionUrlRoutes.TimezoneReverseMode] = '1';
    }

    if (englishLevelIds && englishLevelIds.length) {
      paramsStore[SubscriptionUrlRoutes.EnglishLevel] = englishLevelIds;
    }

    if (experienceIds && experienceIds.length) {
      paramsStore[SubscriptionUrlRoutes.JobExperience] = experienceIds;
    }

    if (employmentTypesIds && employmentTypesIds.length) {
      paramsStore[SubscriptionUrlRoutes.EmploymentType] = employmentTypesIds;
    }

    const url = queryString.stringifyUrl({
      url: `${CandidatesRoute}${countriesPart}${citiesPart}${specializationsPart}`,
      query: paramsStore,
    },
    { arrayFormat: 'comma' });

    return url;
  }
}
