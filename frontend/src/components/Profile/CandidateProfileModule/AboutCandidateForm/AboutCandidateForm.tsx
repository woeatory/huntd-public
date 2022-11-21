import React, { useEffect, useState, FC } from 'react';
import { useForm } from 'react-hook-form';
import { Router } from '@/controllers/i18n/i18n.client';
import { ProfileRoutes } from '@/controllers/router/router.constants';
import { UpdateCandidateProfileMutationVariables } from '@/controllers/graphql/generated';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import CandidateProfileModule
  from '@/components/Profile/CandidateProfileModule/CandidateProfileModule.module.scss';
import { FormField } from '@/components/FormElements/FormField';
import { InputTextArea } from '@/components/FormElements/FormInputs/InputTextArea';
import { useUpdateCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useUpdateCandidateProfile';
import { ProfileFormActions } from '@/components/Profile/ProfileFormActions';
import { WithLoader } from '@/ui/Loader/WithLoader';
import { isNotLink } from '@/controllers/form/form.validators/form.validators';
import { ProfileExamplesBlock } from '@/components/Profile/CandidateProfileModule/AboutCandidateForm/ProfileExamplesBlock';
import { VariantsBlock } from '@/components/Profile/CandidateProfileModule/AboutCandidateForm/VariantsBlock';
import { SpecializationsHints } from '@/controllers/candidateProfile/candidateProfile.constants';
import { analytics } from '@/controllers/analytics/analytics.client';
import { Features } from '@/controllers/features/features.constants';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';

type FormData = UpdateCandidateProfileMutationVariables;

interface Props {
  isFirstTimeFillingProfile: boolean;
}

export const AboutCandidateForm: FC<Props> = (props) => {
  const {
    errors, handleSubmit, setError, control, formState, reset,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const workPlacesFeature = useFeature(Features.WorkPlaces);

  const { isFirstTimeFillingProfile } = props;

  const [updateProfile, { loading }] = useUpdateCandidateProfile();

  const [profile, { loading: profileLoading }] = useLatestCandidateProfile();

  const [edited, setEdited] = useState(false);

  const showExperienceDescription = !!profile?.experienceDescription?.length
    || !workPlacesFeature.isEnabled();

  const [
    currentHint,
    setCurrentHint,
  ] = useState(SpecializationsHints.Frontend);

  const flashMessage = useFlashMessage();

  const { t } = useTranslation([
    Namespaces.Validations,
    Namespaces.Form,
    Namespaces.Profile,
  ]);

  useEffect(() => {
    const specializationId = Math.floor(Math.random() * 3) + 1;

    switch (specializationId) {
      case 1:
        setCurrentHint(SpecializationsHints.Frontend);
        break;
      case 2:
        setCurrentHint(SpecializationsHints.Mobile);
        break;
      default:
        setCurrentHint(SpecializationsHints.Backend);
    }
  }, []);

  useEffect(() => {
    setEdited(formState.isDirty);
  }, [formState.isDirty]);

  const onSubmit = handleSubmit(async (data) => {
    const { experienceDescription, workExpectations, achievements } = data;

    try {
      await updateProfile({
        variables: {
          experienceDescription,
          workExpectations,
          achievements,
        },

        async update() {
          if (isFirstTimeFillingProfile) {
            analytics.sendEvent(
              analytics.events.candidateSignUpFlow.BioStep,
              {},
            );
            await Router.push(`${ProfileRoutes.Contacts}?preview=candidate`);
          }
        },
      });
      reset({ experienceDescription, workExpectations, achievements });
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

            <div className="cell large-6 large-offset-3 mb-32">
              <ProfileExamplesBlock />
            </div>

            <div className="cell large-7 large-offset-3">

              <FormField
                label={{
                  for: 'achievements',
                  text: t(`${Namespaces.Form}:achievements_label`),
                }}
                error={errors.achievements}
                disabled={loading}
                className="mb-16"
                renderInput={(renderProps) => (
                  <InputTextArea
                    {...renderProps}
                    rows={5}
                    defaultValue={profile?.achievements || ''}
                    name="achievements"
                    control={control}
                    validation={{
                      required: {
                        value: true,
                        message: 'achievements_are_required',
                      },
                      validate: (value) => isNotLink(value) || 'links_are_not_allowed',
                    }}
                    placeholder={t(`${Namespaces.Form}:achievements_placeholder`)}
                  />
                )}
              />
              <VariantsBlock
                text={t(`${Namespaces.Form}:${currentHint}_achievements_hint`)}
                isOpen
              />

              {showExperienceDescription && (
                <>
                  <FormField
                    label={{
                      for: 'experienceDescription',
                      text: t(`${Namespaces.Profile}:experience_label`),
                    }}
                    error={errors.experienceDescription}
                    disabled={loading}
                    className="mb-16"
                    renderInput={(renderProps) => (
                      <InputTextArea
                        {...renderProps}
                        rows={5}
                        defaultValue={profile?.experienceDescription || ''}
                        name="experienceDescription"
                        control={control}
                        validation={{
                          validate: (value) => isNotLink(value) || 'links_are_not_allowed',
                        }}
                        placeholder={t(`${Namespaces.Form}:experience_description_placeholder`)}
                      />
                    )}
                  />
                  <VariantsBlock
                    text={t(`${Namespaces.Form}:${currentHint}_experience_hint`)}
                  />
                </>
              )}

              <FormField
                label={{
                  for: 'workExpectations',
                  text: t(`${Namespaces.Form}:about_candidate_expectations_label`),
                }}
                error={errors.workExpectations}
                disabled={loading}
                className="mb-16"
                renderInput={(renderProps) => (
                  <InputTextArea
                    {...renderProps}
                    defaultValue={profile?.workExpectations || ''}
                    name="workExpectations"
                    control={control}
                    rows={5}
                    placeholder={t(`${Namespaces.Form}:work_expectations_placeholder`)}
                    validation={{
                      validate: (value) => isNotLink(value) || 'links_are_not_allowed',
                    }}
                  />
                )}
              />

              <VariantsBlock
                text={t(`${Namespaces.Form}:${currentHint}_expectations_hint`)}
              />
            </div>

            <ProfileFormActions
              handleSubmit={onSubmit}
              discardChanges={reset}
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
