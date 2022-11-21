import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { StepperComponentProps } from '@/components/Stepper/typedefs';
import { EmploymentLocations } from '@/controllers/profile/profile.typedefs';
import { Button } from '@/components/Base/Button';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { useUpdateCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useUpdateCandidateProfile';
import {
  CandidateProfileCityInput, CityTypes,
  UpdateCandidateProfileMutationVariables,
} from '@/controllers/graphql/generated';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { JobExperienceSelect } from '@/components/ProfileModule/ProfileFIlling/Candidate/JobExpectations/components/JobExperience';
import { EnglishLevelSelect } from '@/components/ProfileModule/ProfileFIlling/Candidate/JobExpectations/components/EnglishLevel';
import { EmploymentLocationsInput } from '@/components/ProfileModule/ProfileFIlling/Candidate/JobExpectations/components/EmploymentLocations';
import { JobCitiesSelect } from '@/components/ProfileModule/ProfileFIlling/Candidate/JobExpectations/components/JobCities';
import { LocationInput } from '@/components/ProfileModule/ProfileFIlling/Candidate/JobExpectations/components/LocationInput';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { Colors } from '@/ui/theme/colors';
import { CheckIcon } from '@/ui/icons/general/CheckIcon';
import { typography } from '@/ui/typography/typography.module';
import { Switcher } from '@/components/Switcher';

type FormData = UpdateCandidateProfileMutationVariables & {
  location: CandidateProfileCityInput
};

type Props = StepperComponentProps;

export const JobExpectations: FC<Props> = (props) => {
  const { next } = props;

  const logger = useLogger({ name: 'Job expectations' });
  const { t } = useTranslation([Namespaces.Profile, Namespaces.Form]);

  const {
    handleSubmit, control, errors, setError,
  } = useForm<FormData>();

  const [profile] = useLatestCandidateProfile();
  const [updateProfile] = useUpdateCandidateProfile();

  const [isAnnual, setIsAnnual] = useState(false);
  const [isOffice, setIsOffice] = useState(
    profile?.employmentLocations?.some(
      (option) => option.slug === EmploymentLocations.Office,
    ) || false,
  );

  const locationCity = useMemo(() => profile?.cities?.find(
    (city) => city.type === CityTypes.CandidateCity,
  ), [profile?.cities]);

  const salaryPlaceholder = isAnnual
    ? t(`${Namespaces.Form}:switcher_button_annual`).toLowerCase()
    : t(`${Namespaces.Form}:switcher_button_monthly`).toLowerCase();

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      const {
        englishLevelId, jobExperienceId, salary,
        cities, employmentLocationsIds, location,
      } = data;

      const monthlySalary = isAnnual
        ? Math.round(Number(salary) / 12)
        : salary;

      const preparedCities = cities?.length
        ? [...cities, location]
        : [location];

      await updateProfile({
        variables: {
          salary: Number(monthlySalary),
          englishLevelId: Number(englishLevelId),
          jobExperienceId: Number(jobExperienceId),
          cities: preparedCities,
          employmentLocationsIds,
        },
      });

      next();

      AnalyticsClient.logEvent(
        AnalyticsEvents.userProfile.CandidateProfileFilled,
        { step: 'Job expectations' },
      );
    } catch (error) {
      processValidationErrors<
        UpdateCandidateProfileMutationVariables
        >(error, setError);

      logger.error(error, data);
    }
  }, [isAnnual, updateProfile, next, setError, logger]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <CheckIcon color={Colors.Gray} />
        <Text style={styles.onlyFullTimeLabel}>{t(`${Namespaces.Profile}:only_full_time`)}</Text>
      </View>
      <FormField
        rules={{ required: true }}
        label={t(`${Namespaces.Profile}:salary_label`)}
        placeholder={t(`${Namespaces.Form}:desired_salary`, { salaryPlaceholder })}
        control={control}
        name="salary"
        defaultValue={profile?.salary || ''}
        error={errors.salary}
        renderInput={(inputProps) => (
          <>
            <Switcher
              value={isAnnual}
              setValue={setIsAnnual}
              activeTitle={t(`${Namespaces.Form}:switcher_button_monthly`)}
              inactiveTitle={t(`${Namespaces.Form}:switcher_button_annual`)}
            />
            <InputText {...inputProps} />
          </>

        )}
      />

      <FormField
        rules={{ required: true }}
        label={t(`${Namespaces.Profile}:experience_label`)}
        control={control}
        placeholder={t(`${Namespaces.Form}:select_work_experience`)}
        name="jobExperienceId"
        error={errors.jobExperienceId}
        defaultValue={profile?.jobExperience?.id}
        renderInput={(inputProps) => (
          <JobExperienceSelect {...inputProps} />
        )}
      />

      <FormField
        rules={{ required: true }}
        label={t(`${Namespaces.Form}:english_level_label`)}
        control={control}
        name="englishLevelId"
        error={errors.englishLevelId}
        defaultValue={profile?.englishLevel?.id}
        placeholder={t(`${Namespaces.Form}:select_english_level`)}
        renderInput={(inputProps) => (
          <EnglishLevelSelect {...inputProps} />
        )}
      />

      <FormField
        rules={{ required: true }}
        label={t(`${Namespaces.Form}:location_label`)}
        error={errors.location as any} // TODO: fix as any
        placeholder={t(`${Namespaces.Form}:select_your_location`)}
        control={control}
        name="location"
        renderInput={(inputProps) => (
          <LocationInput
            initialLocation={locationCity}
            {...inputProps}
          />
        )}
      />

      <FormField
        label={t(`${Namespaces.Form}:employment_options`)}
        control={control}
        name="employmentLocationsIds"
        error={errors.employmentLocationsIds}
        renderInput={(inputProps) => (
          <EmploymentLocationsInput
            setIsOffice={setIsOffice}
            initialValues={profile?.employmentLocations?.map(
              (value) => value.id,
            )}
            {...inputProps}
          />
        )}
      />
      {isOffice && (
      <FormField
        rules={{ required: true }}
        control={control}
        placeholder={t(`${Namespaces.Form}:cities_label`)}
        name="cities"
        error={errors.cities}
        renderInput={(inputProps) => (
          <JobCitiesSelect {...inputProps} />
        )}
      />
      )}
      <Button
        onPress={handleSubmit(onSubmit)}
        title={t(`${Namespaces.Profile}:save-and-continue`)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  onlyFullTimeLabel: {
    ...typography.text,
    color: Colors.Semidark,
    marginLeft: 4,
  },
});
