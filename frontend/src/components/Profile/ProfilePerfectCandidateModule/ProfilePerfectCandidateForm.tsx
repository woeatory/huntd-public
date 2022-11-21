import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import typography from '@/ui/typography/typography.module.scss';
import { FormAutoSubmit } from '@/components/FormElements/FormAutoSubmit/FormAutoSubmit';
import { SpecializationFilterInput } from '@/components/Profile/CandidateProfileModule/TechSkillsForm/SpecializationFilterInput';
import filtersStyles from '@/components/Profile/ProfilesListModule/Filters/Filters.module.scss';
import { Loader } from '@/ui/Loader';
import { Button } from '@/ui/buttons/Button';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { SalaryFilterInput } from '@/components/Profile/ProfilesListModule/Filters/SalaryFilterInput';
import { LocationFilterType } from '@/controllers/router/router.constants';
import { TechnologiesFilterInput } from '@/components/Profile/CandidateProfileModule/TechSkillsForm/TechnologiesFilterInput';
import { JobExperiencesFilterInput } from '@/components/Profile/CandidateProfileModule/JobRequirementsForm/JobExperienceFilterInput';
import { EnglishLevelsFilterInput } from '@/components/Profile/CandidateProfileModule/JobRequirementsForm/EnglishLevelsFilterInput';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Features } from '@/controllers/features/features.constants';
import { LocationFilter } from '@/components/Profile/ProfilesListModule/Filters/LocationFilter';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useDefaultFilterValues } from '@/controllers/candidateProfile/candidateProfile.hooks/useDefaultFilterValues';
import { FormDataValues } from '@/components/Profile/ProfilesListModule/Filters/Filters';
import { SalaryRange, TimezoneRange } from '@/components/Profile/ProfilesListModule/Filters';
import { usePerfectCandidatesAmountLazyQuery } from '@/controllers/graphql/generated';
import { useFiltersData } from '@/controllers/candidateProfile/candidateProfile.hooks/useFiltersData';
import styles from '@/components/Profile/ProfilePerfectCandidateModule/ProfilePerfectCandidateModule.module.scss';
import { useCreatePerfectCandidateSubscription } from '@/controllers/subscription/subscription.hooks/useCreatePerfectCandidateSubscription';
import { getPublicProfilesParams } from '@/components/Profile/ProfilesListModule/Filters/Filters.helpers';

type FormData = FormDataValues;

export type LocationState = Record<string, any>;

export const ProfilePerfectCandidateForm: FC = () => {
  const { subscribe } = useCreatePerfectCandidateSubscription();
  const { technologiesData, loading: technologiesLoading } = useFiltersData();
  const [getCandidatesAmount, { data }] = usePerfectCandidatesAmountLazyQuery();

  const {
    technologies: defaultTechnologies,
  } = useDefaultFilterValues({
    technologiesData,
  });

  const formMethods = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      technologies: defaultTechnologies ?? [],
    },
  });

  const [arefiltersUsed, setAreFiltersUsed] = useState(false);

  const [
    locationState, setLocationState,
  ] = useState<LocationState>({});

  const {
    control, handleSubmit,
    formState, watch,
  } = formMethods;

  const timezoneFeature = useFeature(Features.FiltersTimezone);

  const handleSubscribe = handleSubmit(async (formData) => {
    if (
      !formData.locations?.length
      && !formData.jobExperiences
      && !formData.englishLevels
      && !formData.specializations?.length
      && !formData.technologies?.length
      && !formData.salaryRange?.filter(
        (el) => el !== SalaryRange.Min && el !== SalaryRange.Max,
      ).length
      && !formData.timezoneRange?.filter(
        (el) => el !== TimezoneRange.Min && el !== TimezoneRange.Max,
      ).length
    ) {
      return;
    }

    await subscribe(formData, locationState);
  });

  const handleSubmitForm = handleSubmit(async (formData) => {
    const where = getPublicProfilesParams(
      formData,
      locationState,
    );

    setAreFiltersUsed(Object.keys(where).length > 0);
    getCandidatesAmount({
      variables: {
        where,
      },
    });
  });

  const { t } = useTranslation([
    Namespaces.PerfectCandidate,
  ]);

  const timezoneReverseModeOn = watch('timezoneReverseMode');

  const disabled = formState.isSubmitting || technologiesLoading;

  return (
    <form
      onSubmit={handleSubscribe}
      className={filtersStyles.form}
    >
      <Loader
        active={disabled}
        className={filtersStyles.loader}
      />

      <div className="mb-24">
        <SpecializationFilterInput
          formDisabled={disabled}
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
          {...formMethods}
        />
      </div>

      <div className="mb-24">
        <JobExperiencesFilterInput
          formDisabled={disabled}
          {...formMethods}
        />
      </div>

      <div className="mb-24">
        <EnglishLevelsFilterInput
          formDisabled={disabled}
          {...formMethods}
        />
      </div>

      {timezoneFeature.isEnabled() && (
        <div className="mb-24">
          <LocationFilter
            firstSubscriptionMode
            formDisabled={disabled}
            initialTimezoneRange={[
              locationState.timezoneFrom ?? TimezoneRange.Min,
              locationState.timezoneTo ?? TimezoneRange.Max,
            ]}
            locationsInitialValue={[]}
            initialTimezoneReverseMode={false}
            isRangedOutside={timezoneReverseModeOn}
            locationState={locationState}
            setLocationState={setLocationState}
            isTimezoneFilter={(
              locationState.type !== LocationFilterType.CityCountry
            )}
            formMethods={formMethods}
          />
        </div>
      )}

      <div className={styles.buttonsContainer}>
        {arefiltersUsed && (
          <h3 className={cn(styles.text, typography.smallCaption, 'c-semidark-chocolate')}>
            {t(`${Namespaces.PerfectCandidate}:perfect_candidates_count`, { count: data?.perfectCandidatesAmount ?? 0 })}
          </h3>
        )}
        <Button
          disabled={!arefiltersUsed}
          className={styles.button}
          onClick={handleSubscribe}
          mode={Button.mode.Primary}
          text={t(`${Namespaces.PerfectCandidate}:perfect_candidate_submit_form`)}
        />
      </div>

      <FormAutoSubmit
        control={control}
        onSubmit={handleSubmitForm}
      />
    </form>
  );
};
