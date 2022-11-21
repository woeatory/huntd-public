import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import {
  CreateVacanciesSourceMutationVariables,
  VacancySourceType, useCreateVacanciesSourceMutation,
} from '@/controllers/graphql/generated';
import { VacanciesRoutes } from '@/controllers/router/router.constants';
import { Button } from '@/ui/buttons/Button';
import { Loader } from '@/ui/Loader';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import styles from './ATSSetupModule.module.scss';
import { ATSMultipleImportModule } from './ATSMultipleImportModule';

interface Props {
  atsType: VacancySourceType
}

type FormData = Omit<CreateVacanciesSourceMutationVariables, 'type'>;

export const ATSSetupModule = ({ atsType }: Props) => {
  const { t } = useTranslation([Namespaces.Ats, Namespaces.Validations]);
  const router = useRouter();
  const [authUser] = useAuthUser();
  const [
    createVacanciesSourceMutation,
    { loading },
  ] = useCreateVacanciesSourceMutation();

  const {
    errors, handleSubmit, setError, control, register,
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async (data) => {
    const { atsId } = data;

    try {
      await createVacanciesSourceMutation({
        variables: {
          atsId,
          type: atsType,
        },
      });
      await router.push(VacanciesRoutes.AtsSetupSuccess);
    } catch (error) {
      const validationErrors = processValidationErrors<
        CreateVacanciesSourceMutationVariables
      >(error, setError);

      if (!validationErrors) {
        setError('atsId', {
          message: t(`${Namespaces.Validations}:${error.message.toLowerCase()}`),
          type: 'validation',
        });
      }
    }
  });

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x mt-80">
        <div className="cell large-4 large-offset-3">
          <h1 className={cn(typography.smallHeading, 'c-extradark-chocolate mb-8')}>
            {t(`${Namespaces.Ats}:import_jobs_title`)}
          </h1>

          <p className={cn(typography.smallText, 'c-gray')}>
            {t(`${Namespaces.Ats}:ats_instructions_${atsType.toLowerCase()}`)}
            <span className={typography.smallCaption}>
              {` `}
              {t(`${Namespaces.Ats}:ats_link_${atsType.toLowerCase()}`)}
            </span>
          </p>
        </div>
      </div>

      <div className="grid-x grid-margin-x mt-16">
        <div className="cell large-4 large-offset-3">
          <form onSubmit={onSubmit} className={styles.form}>
            <Loader active={loading} />
            <FormField
              label={{
                for: 'atsId',
                text: t(`${Namespaces.Ats}:ats_id_label`),
              }}
              error={errors.atsId}
              disabled={loading}
              className="mb-40"
              renderInput={(props) => (
                <InputText
                  {...props}
                  id="atsId"
                  ref={register}
                  name="atsId"
                  placeholder={t(`${Namespaces.Ats}:ats_input_placeholder_${atsType.toLowerCase()}`)}
                  control={control}
                  validation={{
                    required: {
                      value: true,
                      message: 'required_atsId',
                    },
                  }}
                />
              )}
            />

            <div className={cn(styles.buttonsContainer)}>
              <Button
                className={styles.button}
                mode={Button.mode.Primary}
                size={Button.size.LargeWide}
                disabled={loading}
                type="submit"
                text={t(`${Namespaces.Ats}:add_vacancies_source`)}
              />

              <Button
                className={styles.button}
                mode={Button.mode.Secondary}
                size={Button.size.LargeWide}
                disabled={loading}
                type="button"
                onClick={router.back}
                text={t(`${Namespaces.Ats}:cancel_vacancies_source_adding`)}
              />
            </div>
          </form>

          {authUser?.isAdminUser && (
            <ATSMultipleImportModule atsType={atsType} />
          )}

        </div>
      </div>
    </div>
  );
};
