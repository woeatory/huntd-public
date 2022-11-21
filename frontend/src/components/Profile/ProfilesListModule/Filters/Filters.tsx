import React, {
  Dispatch, FC, SetStateAction,
  useCallback, useMemo, useState,
  useEffect,
} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useFiltersContext } from '@/components/Profile/ProfilesListModule/Filters/filters.context';
import { SpecializationBaseFragment } from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import Filters from '@/components/Profile/ProfilesListModule/Filters/Filters.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Loader } from '@/ui/Loader';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import {
  LocationFilterType,
  LocationTypes,
  Routes,
  Web3FilterSearchQuery,
} from '@/controllers/router/router.constants';
import { getUrlParts } from '@/controllers/candidateProfile/getPublicProfilesUrlParts';
import { useDefaultFilterValues } from '@/controllers/candidateProfile/candidateProfile.hooks/useDefaultFilterValues';
import { useQueryBuilder } from '@/controllers/candidateProfile/candidateProfile.hooks/useQueryBuilder';
import { useFiltersData } from '@/controllers/candidateProfile/candidateProfile.hooks/useFiltersData';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { SpecializationFilterInput } from '@/components/Profile/CandidateProfileModule/TechSkillsForm/SpecializationFilterInput';
import { TechnologiesFilterInput } from '@/components/Profile/CandidateProfileModule/TechSkillsForm/TechnologiesFilterInput';
import {
  SalaryFilterInput,
  SalaryMultipliers,
} from '@/components/Profile/ProfilesListModule/Filters/SalaryFilterInput';
import { EnglishLevelsFilterInput } from '@/components/Profile/CandidateProfileModule/JobRequirementsForm/EnglishLevelsFilterInput';
import { IconClose } from '@/ui/icons/general/IconClose';
import { FormAutoSubmit } from '@/components/FormElements/FormAutoSubmit/FormAutoSubmit';
import { Button } from '@/ui/buttons/Button';
import { FilteredResultCount } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/FilteredResultCount/FilteredResultCount';
import { analytics } from '@/controllers/analytics/analytics.client';
import { SalaryRange, TimezoneRange } from '@/components/Profile/ProfilesListModule/Filters/Filters.constants';
import { useGetUsedFilters } from '@/controllers/candidateProfile/candidateProfile.hooks/useGetUsedFilters';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import { LocationFilter } from '@/components/Profile/ProfilesListModule/Filters/LocationFilter';
import {
  NotAuthorizedFilters,
  NotAuthorizedFiltersTypes,
} from '@/components/Profile/ProfilesListModule/Filters/NotAuthorizedFilters';
import { Selectors } from '@/lib/selectors';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';

const FloatingButtons = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ProfilesListModule/Filters/FloatingButtons');

    return mod.FloatingButtons;
  },
  {
    ssr: false,
  },
);

const SubscriptionsSelect = dynamic(
  async () => {
    const mod = await import('@/components/Profile/HiringManagementModule/Subscriptions/SubscriptionsSelect');

    return mod.SubscriptionsSelect;
  },
  {
    ssr: false,
  },
);

const JobExperiencesFilterInput = dynamic(
  async () => {
    const mod = await import('@/components/Profile/CandidateProfileModule/JobRequirementsForm/JobExperienceFilterInput');

    return mod.JobExperiencesFilterInput;
  },
  {
    ssr: false,
  },
);

interface Props {
  loading: boolean
  error: string | undefined
  isSidebarOpened?: boolean
  closeSideBar?: () => void
  searchParams?: string[];
  filteredCandidatesCount?: number
  selectedSubscription: SelectOption | null;
  setSelectedSubscription: Dispatch<SetStateAction<SelectOption | null>>
}

export interface FormDataValues {
  locations: SelectOption[]
  specializations: SelectOption[]
  technologies: SelectOption[]
  salaryRange: number[]
  salaryMultiplier: SalaryMultipliers
  candidateLocation: LocationFilterType
  englishLevels: SelectOption
  timezoneRange: number[]
  timezoneReverseMode: boolean
  jobExperiences: SelectOption
  employmentTypes: string[]
}

export type LocationState = Record<string, string>;

type FormData = FormDataValues;

export const FiltersModule: FC<Props> = (options) => {
  const [user] = useAuthUser();
  const [profile] = useLatestCandidateProfile();
  const router = useRouter();
  const {
    whereClause: queryValues,
    systemParamsClause: systemQueryValues,
  } = useQueryBuilder(router.query);

  const [
    locationState, setLocationState,
  ] = useState<LocationState>({});

  const { technologiesData, loading: defaultLoading } = useFiltersData();

  const {
    technologies: defaultTechnologies,
  } = useDefaultFilterValues({
    technologiesData,
  });

  const {
    loading, error, closeSideBar,
    filteredCandidatesCount, isSidebarOpened,
    selectedSubscription, setSelectedSubscription,
    searchParams,
  } = options;

  const { t } = useTranslation([
    Namespaces.Validations,
    Namespaces.Form,
    Namespaces.Common,
  ]);

  const formMethods = useForm<FormData>({
    mode: 'onBlur',
    shouldUnregister: false,
  });
  const { isDirty, submitCount } = formMethods.formState;

  const {
    control, handleSubmit, setValue,
    watch, getValues, reset,
  } = formMethods;

  const { setFormMethods } = useFiltersContext();

  setFormMethods(formMethods);

  const disabled = !user || Boolean(error) || loading;

  const hasCandidateProfile = !!profile;

  const shouldAutoSubmit = useMemo(
    () => !disabled && (isDirty || submitCount > 0),
    [disabled, isDirty, submitCount],
  );

  const timezoneReverseModeOn = watch('timezoneReverseMode');

  const usedFilters = useGetUsedFilters({ values: getValues(), locationState });

  const timezoneFeature = useFeature(Features.FiltersTimezone);

  const sendFiltersUsedNotification = useCallback(
    (filtersUsed) => {
      analytics.sendEvent(
        analytics.events.pageInteraction.FiltersUsed,
        { ...filtersUsed },
      );
    },
    [],
  );

  const applyFilters = handleSubmit(async (data) => {
    const {
      locations, salaryMultiplier, salaryRange,
      englishLevels, jobExperiences,
      employmentTypes, candidateLocation,
      timezoneReverseMode, timezoneRange,
      specializations, technologies,
    } = data;

    if (
      !locations?.length
      && !technologies?.length
      && !specializations?.length
      && !salaryRange?.length
      && !englishLevels
      && !jobExperiences
      && !employmentTypes?.length
      && !timezoneRange.length
      && !salaryMultiplier
      && !candidateLocation
    ) {
      await router.push(`${Routes.Candidates}`);

      return;
    }

    if (defaultLoading) {
      return;
    }

    if (Object.values(usedFilters).length > 0) {
      sendFiltersUsedNotification(usedFilters);
    }

    let cities: SelectOption[] = [];
    let countries: SelectOption[] = [];

    if (locations && locations.length > 0) {
      locations.forEach((location) => {
        if (locationState[location.label] === LocationTypes.Country) {
          countries.push(location);
        }

        if (locationState[location.label] === LocationTypes.City) {
          cities.push(location);
        }
      });
    }

    if (!candidateLocation) {
      cities = [];
      countries = [];
    }

    const web3SearchQueries: string[] = Object.values(Web3FilterSearchQuery);

    const [searchParam] = searchParams ?? [];

    if (web3SearchQueries.includes(searchParam) && submitCount < 1) {
      return;
    }

    const url = getUrlParts({
      cities,
      countries,
      specializations,
      technologies,
      salaryRange,
      timezoneRange,
      timezoneReverseMode,
      englishLevels,
      jobExperiences,
      employmentTypes,
      salaryMultiplier,
      candidateLocation,
    });

    await router.push(url);
  });

  const initialValues = useMemo(() => {
    let cities: SelectOption[] = [];
    let countries: SelectOption[] = [];
    let specializations: SpecializationBaseFragment[] = [];
    let englishLevels: number | undefined;
    let jobExperiences: number | undefined;
    let employmentTypes: number[] = [];
    let salaryMultiplier = '';
    let timezoneReverseMode;
    const salaryRange: [number, number] = [
      SalaryRange.Min, SalaryRange.Max,
    ];
    const timezoneRange: [number, number] = [
      TimezoneRange.Min, TimezoneRange.Max,
    ];
    const locations: {
      cities: LocationState,
      countries: LocationState,
    } = { cities: {}, countries: {} };

    if (queryValues.cities && systemQueryValues.candidateLocation) {
      cities = queryValues.cities.map((city) => ({
        label: city,
        value: city,
      }));

      locations.cities = cities.reduce((state, city) => (
        { ...state, [city.label]: LocationTypes.City }
      ), {});
    }

    if (queryValues.countries && systemQueryValues.candidateLocation) {
      countries = queryValues.countries.map((country) => ({
        label: country,
        value: country,
      }));

      locations.countries = countries.reduce((state, country) => (
        { ...state, [country.label]: LocationTypes.Country }
      ), {});
    }

    setLocationState({
      ...locations.cities,
      ...locations.countries,
    });

    if (queryValues.specializations) {
      specializations = queryValues.specializations.map((spec, i) => ({
        id: i,
        name: spec,
      }));
    }

    if (queryValues.salaryFrom) {
      salaryRange[0] = queryValues.salaryFrom;
    }

    if (queryValues.salaryTo) {
      salaryRange[1] = queryValues.salaryTo;
    }

    if (
      (queryValues.timezoneFrom || queryValues.timezoneFrom === 0)
      && !systemQueryValues.candidateLocation
    ) {
      timezoneRange[0] = queryValues.timezoneFrom;
    }

    if (
      (queryValues.timezoneTo || queryValues.timezoneTo === 0)
       && !systemQueryValues.candidateLocation
    ) {
      timezoneRange[1] = queryValues.timezoneTo;
    }

    if (queryValues.timezoneReverseMode) {
      timezoneReverseMode = Boolean(queryValues.timezoneReverseMode);
    }

    if (queryValues.englishLevelIds) {
      englishLevels = Math.min(...queryValues.englishLevelIds);
    }

    if (queryValues.experienceIds) {
      jobExperiences = Math.min(...queryValues.experienceIds);
    }

    if (queryValues.employmentTypesIds) {
      employmentTypes = queryValues.employmentTypesIds;
    }

    if (systemQueryValues.salaryMultiplier) {
      salaryMultiplier = systemQueryValues.salaryMultiplier;
    }

    if (systemQueryValues.candidateLocation) {
      setValue('candidateLocation', LocationFilterType.CityCountry);
    } else {
      setValue('candidateLocation', '');
    }

    return {
      cities,
      countries,
      specializations,
      salaryRange,
      timezoneRange,
      jobExperiences,
      englishLevels,
      employmentTypes,
      salaryMultiplier,
      timezoneReverseMode,
    };
  }, [queryValues, systemQueryValues, setValue]);

  useEffect(() => {
    setValue('technologies', defaultTechnologies);
  }, [defaultTechnologies, setValue]);

  useEffect(() => {
    if (!queryValues.technologiesIds) {
      setValue('technologies', []);
    } else if (!defaultLoading && shouldAutoSubmit) {
      setValue('technologies', getValues('technologies'));
    }
  }, [
    setValue, defaultLoading,
    shouldAutoSubmit, getValues,
    queryValues, reset,
  ]);

  useEffect(() => {
    if (!queryValues.experienceIds) {
      setValue('jobExperiences', null);
    }
  }, [
    setValue, getValues,
    queryValues,
  ]);

  useEffect(() => {
    if (!queryValues.englishLevelIds) {
      setValue('englishLevels', null);
    }
  }, [
    setValue, getValues,
    queryValues,
  ]);

  return (
    <>
      <div>
        <form className={Filters.form}>
          <Loader active={loading} className={Filters.loader} />

          <div className={cn(Filters.filtersWrapper, {
            [Filters.sidebarFilters]: isSidebarOpened,
            [Selectors.Disabled]: !user,
          })}
          >
            {closeSideBar
            && (
              <div className={Filters.sidebarHeader}>
                {t(`${Namespaces.Form}:filters`)}
                /
                <FilteredResultCount
                  count={filteredCandidatesCount || 0}
                />
                <Button
                  className={Filters.closeSidebarButton}
                  onClick={closeSideBar}
                  LeftIcon={IconClose}
                />
              </div>
            )}

            <FloatingButtons
              className={Filters.mobileFloatingButtons}
              disabled={disabled}
              selectedSubscription={selectedSubscription}
            />

            {user
              && (
                <SubscriptionsSelect
                  selectedSubscription={selectedSubscription}
                  setSelectedSubscription={setSelectedSubscription}
                />
              )}

            <div className="mb-24">
              <SpecializationFilterInput
                formDisabled={disabled}
                initialValue={initialValues.specializations || []}
                {...formMethods}
              />
            </div>

            <div className="mb-24">
              <TechnologiesFilterInput
                formDisabled={disabled}
                technologies={technologiesData}
                {...formMethods}
              />
            </div>

            <div className="mb-24">
              <SalaryFilterInput
                formDisabled={disabled}
                initialMultiplier={initialValues.salaryMultiplier}
                initialValue={initialValues.salaryRange}
                {...formMethods}
              />
            </div>

            {!hasCandidateProfile && (
              <div className="mb-24">
                <JobExperiencesFilterInput
                  formDisabled={disabled}
                  initialValue={initialValues?.jobExperiences}
                  {...formMethods}
                />
              </div>
            )}

            <div className="mb-24">
              <EnglishLevelsFilterInput
                formDisabled={disabled}
                initialValue={initialValues?.englishLevels}
                {...formMethods}
              />
            </div>

            {timezoneFeature.isEnabled() && (
              <div className="mb-24">
                <LocationFilter
                  formDisabled={disabled}
                  locationsInitialValue={[
                    ...initialValues.cities,
                    ...initialValues.countries,
                  ]}
                  initialTimezoneRange={initialValues.timezoneRange}
                  initialTimezoneReverseMode={!!queryValues.timezoneReverseMode}
                  isRangedOutside={timezoneReverseModeOn}
                  locationState={locationState}
                  setLocationState={setLocationState}
                  isTimezoneFilter={!systemQueryValues.candidateLocation}
                  formMethods={formMethods}
                />
              </div>
            )}

            {
            shouldAutoSubmit
            && (
              <FormAutoSubmit
                control={control}
                onSubmit={applyFilters}
              />
            )
          }
            <div>
              {closeSideBar && (
                <Button
                  onClick={closeSideBar}
                  mode={Button.mode.Primary}
                  disabled={disabled}
                  type="button"
                  className="mb-16 wide"
                  text={`${t(`${Namespaces.Common}:view_word`)} ${t(`${Namespaces.Common}:search_results`, {
                    count: filteredCandidatesCount,
                  })}`}
                />
              )}
            </div>
          </div>
        </form>
        <NotAuthorizedFilters
          type={NotAuthorizedFiltersTypes.Mobile}
          user={user}
        />
      </div>

      {user && (
        <FloatingButtons
          className={Filters.desktopFloatingButtons}
          disabled={disabled}
          selectedSubscription={selectedSubscription}
        />
      )}
    </>
  );
};
