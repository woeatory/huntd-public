import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { PublicProfilesWhereClause, SystemParamsClause } from '@/controllers/candidateProfile/candidateProfile.typedefs';
import { SearchRoutes, Web3FilterSearchQuery } from '@/controllers/router/router.constants';
import { clamp } from '@/lib/clamp';
import { SalaryRange, TimezoneRange } from '@/components/Profile/ProfilesListModule/Filters';
import data from './Web3SearchFilter.content.json';

interface GetUniqueParamsIds {
  (ids: string) : number[] | null
}
interface GetWeb3Params {
  (searchQuery: string) : GetWeb3ParamsResult
}
interface GetWeb3ParamsResult {
  web3Technologies: string,
  web3Params: string[]
}
interface Result {
  whereClause: PublicProfilesWhereClause;
  systemParamsClause: SystemParamsClause;
}

const removeDuplicates = (urlPart: string) => {
  const uniqueValues: string[] = [];

  urlPart.trim().split(',').forEach((item) => {
    if (!uniqueValues.includes(item)) {
      uniqueValues.push(item.trim());
    }
  });

  return uniqueValues;
};

const getPreparedLocations = (locations: string[]) => {
  const preparedLocations = locations.map((location) => {
    const dividers = location.match(/[-_]/);
    const divider = dividers
      ? dividers[0]
      : null;

    const updatedLocation = location.split(divider as string)
      .map((part) => part[0].toUpperCase() + part.slice(1));

    switch (divider) {
      case '-':
        return updatedLocation.join(divider);
      default:
        return updatedLocation.join(' ');
    }
  });

  return preparedLocations;
};

const getUniqueParamsIds: GetUniqueParamsIds = (ids) => {
  const cleanedIds = ids.trim()
    .split(',')
    .map((id) => Math.abs(+id))
    .filter(Boolean);

  if (!cleanedIds.length) {
    return null;
  }

  return [...new Set(cleanedIds)];
};

const getWeb3Params: GetWeb3Params = (searchQuery: string) => {
  let web3technologiesIds: string[] = [];
  let web3Params: string[] = [];

  switch (searchQuery) {
    case Web3FilterSearchQuery.Web3:
    case Web3FilterSearchQuery.Defi:
    case Web3FilterSearchQuery.Nft:
    case Web3FilterSearchQuery.Blockchain:
    case Web3FilterSearchQuery.SmartContract:
    case Web3FilterSearchQuery.Solidity:
    case Web3FilterSearchQuery.Solana:
    case Web3FilterSearchQuery.React:
      web3technologiesIds = [...data[searchQuery].technologiesIds];
      break;
    case Web3FilterSearchQuery.Frontend:
    case Web3FilterSearchQuery.Backend:
    case Web3FilterSearchQuery.Fullstack:
    case Web3FilterSearchQuery.Mobile:
      web3technologiesIds = [...data[searchQuery].technologiesIds];
      web3Params = ['any-country', 'any-city', data[searchQuery].role];
      break;
    default: {
      break;
    }
  }

  return { web3Technologies: web3technologiesIds.join(','), web3Params };
};

export const useQueryBuilder = (
  query: ParsedUrlQuery,
): Result => {
  const result = useMemo(() => {
    const resultClause: PublicProfilesWhereClause = {};
    const systemParamsClause: SystemParamsClause = {};

    if (!Object.keys(query).length) {
      return {
        whereClause: {},
        systemParamsClause: {},
      };
    }

    let { params, technologies } = query;

    const [searchQuery] = params ?? [];

    const web3SearchQueries: string[] = Object.values(Web3FilterSearchQuery);

    if (web3SearchQueries.includes(searchQuery)) {
      const { web3Params, web3Technologies } = getWeb3Params(searchQuery);

      params = web3Params;
      technologies = web3Technologies;
    }

    if (params) {
      const cities: string[] = [];
      const countries: string[] = [];
      const specializations: string[] = [];
      const [
        countriesString,
        citiesString,
        specializationsString,
      ] = params as string[];

      if (countriesString && countriesString.trim().length > 0) {
        if (!countriesString.includes(SearchRoutes.AnyCountry)) {
          const uniqueCountries = removeDuplicates(countriesString);
          const preparedCountries = getPreparedLocations(uniqueCountries);

          countries.push(...preparedCountries);
        }
      }

      if (citiesString && citiesString.trim().length > 0) {
        if (!citiesString.includes(SearchRoutes.AnyCity)) {
          const uniqueCities = removeDuplicates(citiesString);
          const preparedCities = getPreparedLocations(uniqueCities);

          cities.push(...preparedCities);
        }
      }

      if (specializationsString
        && specializationsString.trim().length > 0
      ) {
        specializations.push(...removeDuplicates(specializationsString)
          .map((item) => item
            .replace('-sharp', '#')
            .replace(/plus/g, '+')
            .replace(/[-]/g, '/')
            .replace(/[_]/, ' ')));
      }

      if (cities.length > 0) {
        resultClause.cities = cities;
      }

      if (countries.length > 0) {
        resultClause.countries = countries;
      }

      if (specializations.length > 0) {
        resultClause.specializations = specializations;
      }
    }

    if (query.salaryFrom && !Number.isNaN(+query.salaryFrom)) {
      resultClause.salaryFrom = clamp(
        Number(query.salaryFrom),
        SalaryRange.Min,
        SalaryRange.Max,
      );
    }

    if (query.salaryTo && !Number.isNaN(+query.salaryTo)) {
      resultClause.salaryTo = clamp(
        Number(query.salaryTo),
        SalaryRange.Min,
        SalaryRange.Max,
      );
    }

    if (query.salaryMultiplier) {
      const { salaryMultiplier } = query;

      systemParamsClause.salaryMultiplier = salaryMultiplier as string;
    }

    if (query.candidateLocation) {
      const { candidateLocation } = query;

      systemParamsClause.candidateLocation = candidateLocation as string;
    }

    if (!Number.isNaN(Number(query.timezoneFrom))) {
      resultClause.timezoneFrom = clamp(
        Number(query.timezoneFrom),
        TimezoneRange.Min,
        TimezoneRange.Max,
      );
    }

    if (!Number.isNaN(Number(query.timezoneTo))) {
      resultClause.timezoneTo = clamp(
        Number(query.timezoneTo),
        TimezoneRange.Min,
        TimezoneRange.Max,
      );
    }

    if (query.timezoneReverseMode) {
      resultClause.timezoneReverseMode = Boolean(query.timezoneReverseMode);
    }

    if (query.jobExperience) {
      const experienceIds = query.jobExperience as string;

      resultClause.experienceIds = getUniqueParamsIds(experienceIds);
    }

    if (query.englishLevels) {
      const levelsIds = query.englishLevels as string;

      resultClause.englishLevelIds = getUniqueParamsIds(levelsIds);
    }

    if (query.employmentTypes) {
      const employmentTypesIds = query.employmentTypes as string;

      resultClause.employmentTypesIds = getUniqueParamsIds(employmentTypesIds);
    }

    if (technologies) {
      const technologiesIds = technologies as string;

      resultClause.technologiesIds = getUniqueParamsIds(technologiesIds);
    }

    if (query.searchQuery) {
      resultClause.searchQuery = query.searchQuery as string;
    }

    return {
      whereClause: resultClause,
      systemParamsClause,
    };
  }, [query]);

  return result;
};
