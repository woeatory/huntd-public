import React, { FC } from 'react';
import router from 'next/router';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import typography from '@/ui/typography/typography.module.scss';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import {
  CreateMultipleVacanciesSourcesParameters,
  useCreateMultipleVacanciesSourcesMutation,
  VacancySourceType,
} from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { VacanciesRoutes } from '@/controllers/router/router.constants';
import { Loader } from '@/ui/Loader';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { Button } from '@/ui/buttons/Button';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import styles from './ATSSetupModule.module.scss';

interface Props {
  atsType: VacancySourceType;
}

type FormData = Omit<CreateMultipleVacanciesSourcesParameters, 'type'>;

export const ATSMultipleImportModule: FC<Props> = ({ atsType }) => {
  const {
    errors, handleSubmit, setError, control, register,
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const { t } = useTranslation([Namespaces.Ats, Namespaces.Validations]);

  const [
    createMultipleVacanciesSources,
    { loading },
  ] = useCreateMultipleVacanciesSourcesMutation();

  const flashMessage = useFlashMessage();

  const onSubmit = handleSubmit(async (data) => {
    const {
      atsIds,
      companyNames,
      salaryRanges,
    } = data;

    try {
      await createMultipleVacanciesSources({
        variables: {
          options: {
            atsIds,
            type: atsType,
            companyNames,
            salaryRanges,
          },
        },
      });
    } catch (error) {
      const validationErrors = processValidationErrors<
        CreateMultipleVacanciesSourcesParameters
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

    await router.push(VacanciesRoutes.AtsSetupSuccess);
  });

  return (
    <form className="mt-24" onSubmit={onSubmit}>
      <Loader active={loading} />
      <h2 className={cn(typography.smallHeading, 'mb-16')}>
        {t(`${Namespaces.Ats}:import_multiple_jobs_title`)}
      </h2>
      <FormField
        label={{
          for: 'atsIds',
          text: t(`${Namespaces.Ats}:ats_ids_label`),
        }}
        error={errors.atsIds}
        disabled={loading}
        className="mb-40"
        renderInput={(props) => (
          <InputText
            {...props}
            id="atsIds"
            ref={register}
            name="atsIds"
            placeholder={t(`${Namespaces.Ats}:ats_ids_placeholder`)}
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

      <FormField
        label={{
          for: 'companyNames',
          text: t(`${Namespaces.Ats}:company_names_label`),
        }}
        error={errors.companyNames}
        disabled={loading}
        className="mb-40"
        renderInput={(props) => (
          <InputText
            {...props}
            id="companyNames"
            ref={register}
            name="companyNames"
            placeholder={t(`${Namespaces.Ats}:company_names_placeholder`)}
            control={control}
            validation={{
              required: {
                value: true,
                message: 'required_companyNames',
              },
            }}
          />
        )}
      />

      <FormField
        label={{
          for: 'salaryRanges',
          text: t(`${Namespaces.Ats}:salary_ranges_label`),
        }}
        error={errors.salaryRanges}
        disabled={loading}
        className="mb-40"
        renderInput={(props) => (
          <InputText
            {...props}
            id="salaryRanges"
            ref={register}
            name="salaryRanges"
            placeholder={t(`${Namespaces.Ats}:salary_ranges_placeholder`)}
            control={control}
            validation={{
              required: {
                value: true,
                message: 'required_salary_ranges',
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
  );
};
