import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useJobExperiencesQuery, useSpecializationQuery } from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { Select } from '@/components/FormElements/Select';
import { FormField } from '@/components/FormElements/FormField';
import { getSpecializationsOptions } from '@/components/Profile/CandidateProfileModule/TechSkillsForm/SpecializationFilterInput';
import { getJobExperiencesOptions } from '@/components/Profile/CandidateProfileModule/JobRequirementsForm/JobExperienceFilterInput';
import { InputEmail } from '@/components/FormElements/FormInputs/InputEmail';
import { Button } from '@/ui/buttons/Button';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { SingleSlider } from '@/components/FormElements/Slider/SingleSlider';
import styles from './VacanciesSubscriptionForm.module.scss';

interface VacanciesFormDataValues {
  roles: SelectOption[]
  salary: number,
  jobExperiences: SelectOption
  email: string;
}

enum SalaryRange {
  Min = 60,
  Max = 200,
  Step = 10,
  Default = 90,
}

type FormData = VacanciesFormDataValues;

export const VacanciesSubscriptionForm: FC = () => {
  const { t } = useTranslation([
    Namespaces.Vacancy,
    Namespaces.Validations,
    Namespaces.Candidates,
  ]);

  const [authUser] = useAuthUser();
  const isAnonymous = !authUser;

  const flashMessage = useFlashMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const formMethods = useForm<FormData>({
    mode: 'onBlur',
  });
  const {
    control, handleSubmit, setValue,
    getValues, reset, errors,
  } = formMethods;

  const onSubmit = handleSubmit(async (data) => {
    const {
      email, jobExperiences, roles, salary,
    } = data;

    const userEmail = authUser
      ? authUser.email
      : email;

    const experience = jobExperiences.label || '';

    const role = roles.length
      ? roles.map((option) => option.label).join(', ')
      : '';

    const salaryRange = `${salary}k - ${SalaryRange.Max}k`;

    setLoading(true);

    analytics.sendEvent(
      analytics.events.vacancies.VacancySubscriptionSent,
      {
        userEmail,
        experience,
        role,
        salaryRange,
      },
    );

    reset();

    await flashMessage.postMessage({
      variables: {
        type: flashMessage.messageTypes.Success,
        text: t(`${Namespaces.Vacancy}:we_will_notify`),
        heading: t(`${Namespaces.Vacancy}:subscription_created`),
      },
    });

    // mocking request delay
    setTimeout(() => setLoading(false), 1000);
  });

  const [sliderValue, setSliderValue] = useState<number>(SalaryRange.Default);

  useEffect(() => {
    setValue('salary', sliderValue, {
      shouldDirty: true,
    });
  }, [setValue, sliderValue]);

  const handleSliderChange = useCallback((value: number) => {
    setSliderValue(value);
  }, []);

  const rolesQueryResult = useSpecializationQuery();

  const roles = useMemo(
    () => rolesQueryResult.data?.specializations ?? [],
    [rolesQueryResult],
  );

  const jobExperiencesQueryResult = useJobExperiencesQuery();

  const jobExperiences = useMemo(
    () => jobExperiencesQueryResult.data?.jobExperiences ?? [],
    [jobExperiencesQueryResult],
  );

  return (
    <div className={cn(styles.formWrapper, 'cell large-9 large-offset-2 mt-80')}>
      <div className={styles.textBlock}>
        <p className={cn(styles.textHeading, 'mb-8')}>
          {t(`${Namespaces.Vacancy}:stay_on_top`)}
        </p>
        <p className={styles.text}>
          {t(`${Namespaces.Vacancy}:receive_web3_jobs`)}
        </p>
      </div>

      <div className={styles.formBlock}>
        <form>
          <FormField
            disabled={loading}
            className='mb-16'
            renderInput={(inputProps) => (
              <Select
                {...inputProps}
                control={control}
                name="roles"
                id="roles"
                isDisabled={loading}
                isOptionSelected={(option) => {
                  const currentValues = getValues('roles');

                  return currentValues
                    ? currentValues.some((spec) => spec.label === option.label)
                    : false;
                }}
                isMulti
                options={getSpecializationsOptions(roles)}
                placeholder={t(`${Namespaces.Vacancy}:vacancies_role`)}
              />
            )}
          />

          <FormField
            disabled={loading}
            className="mb-16"
            renderInput={(inputProps) => (
              <Select
                isClearable
                {...inputProps}
                control={control}
                id="job-experiences"
                name="jobExperiences"
                isDisabled={loading}
                options={getJobExperiencesOptions(jobExperiences)}
                placeholder={t(`${Namespaces.Vacancy}:vacancies_experience`)}
              />
            )}
          />

          <FormField
            className={cn(styles.sliderContainer, 'mb-24')}
            disabled={loading}
            renderInput={(inputProps) => (
              <>
                <div className={styles.sliderValuesArea}>
                  <span>{t(`${Namespaces.Vacancy}:yearly_net_salary`)}</span>
                  &nbsp;
                  <span className={styles.sliderValue}>
                    {
                      `$${sliderValue}k - $${SalaryRange.Max}k+`
                    }
                  </span>
                </div>
                <SingleSlider
                  {...inputProps}
                  control={control}
                  name="salary"
                  id="salary"
                  className="mt-16"
                  value={sliderValue}
                  defaultValue={90}
                  step={SalaryRange.Step}
                  min={SalaryRange.Min}
                  max={SalaryRange.Max}
                  handleSliderChange={handleSliderChange}
                />
              </>
            )}
          />

          <div className={styles.actionContainer}>
            {isAnonymous && (
              <FormField
                error={errors.email}
                disabled={loading}
                className={styles.emailContainer}
                renderInput={(renderProps) => (
                  <InputEmail
                    {...renderProps}
                    className={styles.inputEmail}
                    autoComplete="email"
                    name="email"
                    control={control}
                    placeholder={t(`${Namespaces.Vacancy}:vacancies_email`)}
                    validation={{
                      required: {
                        value: true,
                        message: 'required_email',
                      },
                    }}
                  />
                )}
              />
            )}

            <Button
              mode={Button.mode.Primary}
              size={Button.size.LargeWide}
              disabled={loading}
              type="submit"
              onClick={onSubmit}
              className={cn(styles.submitBtn, {
                [styles.btnOnly]: !isAnonymous,
              })}
              text={t(`${Namespaces.Vacancy}:receive_jobs`)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
