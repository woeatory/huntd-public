import React, {
  FC, useEffect, useMemo,
} from 'react';
import { useJobExperiencesQuery, JobExperienceBaseFragment } from '@/controllers/graphql/generated';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { i18n } from '@/controllers/i18n/i18n.client';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { FormField } from '@/components/FormElements/FormField';
import { FormFieldProps } from '@/controllers/form/form.typedefs';
import { Select } from '@/components/FormElements/Select';

interface FieldProps {
  jobExperiences: SelectOption
}

type Props = FormFieldProps<number, FieldProps>

export const getJobExperiencesOptions = (
  jobExperiences: JobExperienceBaseFragment[],
) => jobExperiences.map((jobExperience) => ({
  label: i18n.t(`${Namespaces.Candidates}:${jobExperience.slug}`),
  value: `${jobExperience.id}`,
}));

export const JobExperiencesFilterInput: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Candidates, Namespaces.Form]);
  const { initialValue, setValue } = props;

  const jobExperiencesQueryResult = useJobExperiencesQuery();

  const jobExperiences = useMemo(
    () => jobExperiencesQueryResult.data?.jobExperiences ?? [],
    [jobExperiencesQueryResult],
  );

  useEffect(() => {
    if (initialValue && jobExperiences.length) {
      const experience = jobExperiences.find(
        (exp) => exp.id === initialValue,
      );

      if (experience) {
        const option = {
          label: t<string>(`${Namespaces.Candidates}:${experience.slug}`),
          value: `${experience.id}`,
        };

        setValue('jobExperiences', option);
      }
    }
  }, [initialValue, t, setValue, jobExperiences]);

  return (
    <FormField
      disabled={props.formDisabled}
      label={{
        for: 'job-experiences',
        text: t(`${Namespaces.Form}:job_experience_label`),
      }}
      renderInput={(inputProps) => (
        <Select
          isClearable
          {...inputProps}
          control={props.control}
          id="job-experiences"
          name="jobExperiences"
          menuPlacement="top"
          isDisabled={props.formDisabled}
          options={getJobExperiencesOptions(jobExperiences)}
          placeholder={t(`${Namespaces.Form}:job_experience_label`)}
        />
      )}
    />
  );
};
