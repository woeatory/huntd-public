import React, { useState, useEffect, FC } from 'react';
import { useForm } from 'react-hook-form';
import { PrimaryProfile, UpdateCandidateProfileMutationVariables } from '@/controllers/graphql/generated';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import CandidateProfileModule
  from '@/components/Profile/CandidateProfileModule/CandidateProfileModule.module.scss';
import { Router } from '@/controllers/i18n/i18n.client';
import { CandidateProfileRoutes } from '@/controllers/router/router.constants';
import { useUpdateCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useUpdateCandidateProfile';
import { ProfileFormActions } from '@/components/Profile/ProfileFormActions/ProfileFormActions';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { WithLoader } from '@/ui/Loader/WithLoader';
import { ProfileSpecializationInput } from '@/components/Profile/CandidateProfileModule/TechSkillsForm/ProfileSpecializationInput';
import { ProfileTechnologiesInput } from '@/components/Profile/CandidateProfileModule/TechSkillsForm/ProfileTechnologiesInput';
import { analytics } from '@/controllers/analytics/analytics.client';

interface FormData extends UpdateCandidateProfileMutationVariables {
  technologies: SelectOption[] | null;
  specialization: SelectOption | null;
  specializations: SelectOption[] | null;
}

interface Props {
  isFirstTimeFillingProfile: boolean;
}

export const TechSkillsForm: FC<Props> = (props) => {
  const formMethods = useForm<FormData>({
    mode: 'onBlur',
  });

  const { isFirstTimeFillingProfile } = props;

  const {
    errors, control, handleSubmit, setError, formState, reset, getValues,
  } = formMethods;

  const [updateProfile, { loading }] = useUpdateCandidateProfile();

  const [profile, { loading: profileLoading }] = useLatestCandidateProfile();

  const [edited, setEdited] = useState(false);

  const [initialFormValues, setInitialFormValues] = useState<FormData>(
    {} as FormData,
  );

  const flashMessage = useFlashMessage();

  const { t } = useTranslation([
    Namespaces.Validations,
    Namespaces.Form,
    Namespaces.Profile,
  ]);

  useEffect(() => {
    setInitialFormValues(getValues());
  }, [getValues]);

  useEffect(() => {
    setEdited(formState.isDirty);
  }, [formState.isDirty]);

  const discardChanges = () => {
    reset(initialFormValues);
  };

  const onSubmit = handleSubmit(async (data) => {
    const {
      position, technologies,
      specialization, specializations,
    } = data;

    const technologiesIds = technologies
      ? technologies.map((el) => Number(el.value))
      : [];

    const specializationsIds = specializations
      ? specializations.map((el) => Number(el.value))
      : [];

    try {
      await updateProfile({
        variables: {
          position,
          technologiesIds,
          specializationId: Number(specialization?.value),
          specializationsIds,
        },
        async update() {
          analytics.setUserProperties({
            primaryProfile: PrimaryProfile.Candidate,
            position,
            specialization: specialization?.label,
            specializationsIds,
          });

          if (isFirstTimeFillingProfile) {
            analytics.sendEvent(
              analytics.events.candidateSignUpFlow.SpecialityStep,
              {},
            );
            await Router.push(CandidateProfileRoutes.JobExpectations);
          }
        },
      });
      reset({
        position,
        technologies,
        specialization,
        specializations,
      });
    } catch (error) {
      const validationErrors = processValidationErrors<
        UpdateCandidateProfileMutationVariables
        >(error, setError);

      if (!validationErrors) {
        await flashMessage.postMessage({
          variables: {
            type: flashMessage.messageTypes.Error,
            text: t(`${Namespaces.Validations}:${error.message.toLowerCase()}`),
            heading: t(`${Namespaces.Validations}:validation_message_title`),
          },
        });
      }
    }
  });

  return (
    <form
      className={CandidateProfileModule.form}
    >
      <WithLoader loading={profileLoading}>
        <div className="grid-container">
          <div className="grid-x grid-margin-x">
            <div className="cell large-5 large-offset-3">

              <FormField
                label={{
                  for: 'position',
                  text: t(`${Namespaces.Form}:position_label`),
                }}
                error={errors.position}
                disabled={loading}
                className="mb-24"
                renderInput={(renderProps) => (
                  <InputText
                    {...renderProps}
                    defaultValue={profile?.position || ''}
                    name="position"
                    control={control}
                    validation={{
                      required: {
                        value: true,
                        message: 'position_is_required',
                      },
                    }}
                    placeholder={t(`${Namespaces.Form}:position_placeholder`)}
                  />
                )}
              />

              <div className="mb-24">
                <ProfileSpecializationInput
                  formDisabled={loading}
                  initialValue={profile?.specializations}
                  {...formMethods}
                />
              </div>

              <div className="mb-40">
                <ProfileTechnologiesInput
                  formDisabled={loading}
                  initialValue={profile?.technologies}
                  {...formMethods}
                />
              </div>

            </div>

            <ProfileFormActions
              handleSubmit={onSubmit}
              discardChanges={discardChanges}
              loading={loading}
              edited={edited}
              setEdited={setEdited}
            />
          </div>
        </div>
      </WithLoader>
    </form>
  );
};
