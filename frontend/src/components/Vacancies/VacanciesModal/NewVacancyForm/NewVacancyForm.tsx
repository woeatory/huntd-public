import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { Button } from '@/ui/buttons/Button';

interface FormData {
  vacancyLink: string;
  contactEmail: string;
}

interface Props {
  handleVacancyPost: (vacancyLink: string, contactEmail: string) => void;
}

export const NewVacancyForm = memo<Props>((props) => {
  const { handleVacancyPost } = props;

  const { t } = useTranslation([Namespaces.Form, Namespaces.Vacancy]);

  const formMethods = useForm<FormData>({
    mode: 'onSubmit',
  });

  const { handleSubmit, control, errors } = formMethods;

  const onSubmit = handleSubmit(async (data) => {
    const { vacancyLink, contactEmail } = data;

    handleVacancyPost(vacancyLink, contactEmail);
  });

  return (
    <form onSubmit={onSubmit}>
      <FormField
        label={{
          for: 'vacancyLink',
          text: t(`${Namespaces.Form}:vacancy_link_label`),
        }}
        error={errors.vacancyLink}
        disabled={false}
        className="mb-24"
        renderInput={(options) => (
          <InputText
            {...options}
            placeholder={t(`${Namespaces.Form}:vacancy_link_placeholder`)}
            name='vacancyLink'
            control={control}
            validation={{
              required: {
                value: true,
                message: 'vacancy_link_is_required',
              },
            }}
          />
        )}
      />

      <FormField
        label={{
          for: 'contactEmail',
          text: t(`${Namespaces.Form}:contact_email_label`),
        }}
        error={errors.contactEmail}
        disabled={false}
        className="mb-24"
        renderInput={(options) => (
          <InputText
            {...options}
            placeholder={t(`${Namespaces.Form}:contact_email_placeholder`)}
            name='contactEmail'
            control={control}
            validation={{
              required: {
                value: true,
                message: 'contact_email_is_required',
              },
            }}
          />
        )}
      />

      <Button
        mode={Button.mode.Primary}
        disabled={false}
        type="submit"
        className="mb-16"
        text={t(`${Namespaces.Vacancy}:create_job`)}
      />
    </form>
  );
});
