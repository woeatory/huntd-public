import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import {
  UpdateCandidateProfileMutationVariables,
  UpdateRecruiterProfileMutationVariables,
} from '@/controllers/graphql/generated';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { Button } from '@/components/Base/Button';
import { useUpdateRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks/useUpdateRecruiterProfile';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { StackRoutes } from '@/controllers/router/router.constants';

type FormData = UpdateRecruiterProfileMutationVariables;

export const CompanyDetailsForm: FC = () => {
  const navigation = useNavigation();

  const logger = useLogger({ name: 'Speciality' });
  const { t } = useTranslation([Namespaces.Profile, Namespaces.Form]);

  const [updateRecruiterProfile, { loading }] = useUpdateRecruiterProfile();

  const {
    handleSubmit, control, errors, setError,
  } = useForm<FormData>();

  const onSubmit = useCallback(async (formData: FormData) => {
    try {
      const { position, companyName } = formData;

      const { data } = await updateRecruiterProfile({
        variables: { position, companyName },
      });

      AnalyticsClient.logEvent(
        AnalyticsEvents.userProfile.RecruiterProfileFilled,
      );

      if (data?.updateRecruiterProfile.slug) {
        navigation.navigate(StackRoutes.Recruiter, {
          slug: data.updateRecruiterProfile.slug,
        });
      } else {
        navigation.goBack();
      }
    } catch (error) {
      processValidationErrors<
        UpdateCandidateProfileMutationVariables
        >(error, setError);

      logger.error(error);
    }
  }, [logger, navigation, setError, updateRecruiterProfile]);

  return (
    <>
      <FormField
        rules={{ required: true }}
        control={control}
        name="position"
        label={t(`${Namespaces.Form}:recruiter_position_label`)}
        placeholder={t(`${Namespaces.Form}:recruiter_position_placeholder`)}
        error={errors.position}
        renderInput={(inputProps) => (
          <InputText {...inputProps} />
        )}
      />

      <FormField
        rules={{ required: true }}
        control={control}
        name="companyName"
        label={t(`${Namespaces.Form}:company_name_label`)}
        error={errors.companyName}
        renderInput={(inputProps) => (
          <InputText {...inputProps} />
        )}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        title={t(`${Namespaces.Profile}:save-and-continue`)}
        disabled={loading}
      />
    </>
  );
};
