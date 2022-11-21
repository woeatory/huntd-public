import React, { FC, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { StepperComponentProps } from '@/components/Stepper/typedefs';
import { Button } from '@/components/Base/Button';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { useUpdateCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useUpdateCandidateProfile';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { UpdateCandidateProfileMutationVariables } from '@/controllers/graphql/generated';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { SpecializationSelect } from '@/components/ProfileModule/ProfileFIlling/Candidate/Speciality/components/Specialization';
import { TechnologiesSelect } from '@/components/ProfileModule/ProfileFIlling/Candidate/Speciality/components/Technologies';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';

type FormData = UpdateCandidateProfileMutationVariables;
type Props = StepperComponentProps;

export const Speciality: FC<Props> = (props) => {
  const { next } = props;

  const logger = useLogger({ name: 'Speciality' });
  const { t } = useTranslation([Namespaces.Profile, Namespaces.Form]);

  const {
    handleSubmit, control, errors, setError,
  } = useForm<FormData>();

  const [profile] = useLatestCandidateProfile();
  const [updateProfile] = useUpdateCandidateProfile();

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      const { position, specializationId, technologiesIds } = data;

      await updateProfile({
        variables: {
          position,
          specializationId: Number(specializationId),
          technologiesIds,
        },
      });

      next();

      AnalyticsClient.logEvent(
        AnalyticsEvents.userProfile.CandidateProfileFilled,
        { step: 'Speciality' },
      );
    } catch (error) {
      processValidationErrors<
        UpdateCandidateProfileMutationVariables
      >(error, setError);

      logger.error(error, data);
    }
  }, [updateProfile, next, setError, logger]);

  return (
    <ScrollView>
      <FormField
        rules={{ required: true }}
        label={t(`${Namespaces.Form}:position_label`)}
        placeholder={t(`${Namespaces.Form}:position_placeholder`)}
        defaultValue={profile?.position || ''}
        name="position"
        error={errors.position}
        control={control}
        renderInput={(inputProps) => (
          <InputText {...inputProps} />
        )}
      />

      <FormField
        rules={{ required: true }}
        label={t(`${Namespaces.Form}:specialization_label`)}
        name="specializationId"
        error={errors.specializationId}
        control={control}
        defaultValue={profile?.specialization?.id}
        placeholder={t(`${Namespaces.Form}:select_specialization`)}
        renderInput={(inputProps) => (
          <SpecializationSelect {...inputProps} />
        )}
      />

      <FormField
        rules={{ required: true }}
        name="technologiesIds"
        control={control}
        error={errors.technologiesIds}
        renderInput={(inputProps) => (
          <TechnologiesSelect {...inputProps} />
        )}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        title={t(`${Namespaces.Profile}:save-and-continue`)}
      />
    </ScrollView>
  );
};
