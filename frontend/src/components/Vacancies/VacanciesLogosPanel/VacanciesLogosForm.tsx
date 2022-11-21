import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { useAddVacanciesLogoMutation } from '@/controllers/graphql/generated';
import { COMPANIES } from '@/components/Web3Companies/constants';
import typography from '@/ui/typography/typography.module.scss';
import styles from './VacanciesLogosModal.module.scss';

type FormData = {
  companies: string;
}

interface Props {
  closeModal: () => void;
}

export const VacanciesLogosPanelActions: FC<Props> = ({
  closeModal,
}) => {
  const { t } = useTranslation([Namespaces.Vacancy]);

  const {
    handleSubmit, control,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [addVacanciesLogos, {
    loading: vacanciesLogosLoading,
  }] = useAddVacanciesLogoMutation();

  const addLogosFromList = async () => {
    const companyNames = COMPANIES.map((company) => company.companyName);

    await addVacanciesLogos({
      variables: {
        companyNames,
      },
    });

    closeModal();
  };

  const onSubmit = handleSubmit(async (data) => {
    const { companies } = data;

    const companyNames = companies.split(', ');

    await addVacanciesLogos({
      variables: {
        companyNames,
      },
    });

    closeModal();
  });

  return (
    <form onSubmit={onSubmit} className="mb-24">
      <div className={styles.titleWrapper}>
        <h3 className={typography.accentTitle}>
          {t(`${Namespaces.Vacancy}:update_logos_title`)}
        </h3>
      </div>

      <FormField
        label={{
          for: 'companies',
          text: t(`${Namespaces.Vacancy}:update_logos_label`),
        }}
        disabled={false}
        className="mb-24"
        renderInput={(inputProps) => (
          <InputText
            {...inputProps}
            name="companies"
            control={control}
            placeholder={t(`${Namespaces.Vacancy}:company_names_placeholder`)}
            validation={{
              required: {
                value: true,
                message: 'company_names_required',
              },
            }}
          />
        )}
      />
      <Button
        mode={Button.mode.Primary}
        size={Button.size.SmallWide}
        text={t(`${Namespaces.Vacancy}:update_logos_from_input`)}
        isLoading={vacanciesLogosLoading}
        type="submit"
      />
      <div className="mt-16">
        <Button
          mode={Button.mode.Secondary}
          size={Button.size.Small}
          onClick={addLogosFromList}
          text={t(`${Namespaces.Vacancy}:update_logos_from_list`)}
          isLoading={vacanciesLogosLoading}
        />
      </div>
    </form>
  );
};
