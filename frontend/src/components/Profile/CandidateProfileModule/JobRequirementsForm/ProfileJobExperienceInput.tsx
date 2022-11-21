import React, { FC, useEffect, useMemo } from 'react';
import {
  JobExperienceBaseFragment,
  useJobExperiencesQuery,
} from '@/controllers/graphql/generated';
import { Select } from '@/components/FormElements/Select';
import { i18n } from '@/controllers/i18n/i18n.client';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { FormField } from '@/components/FormElements/FormField';
import { FormFieldProps } from '@/controllers/form/form.typedefs';

const getJobExperiencesOptions = (
  jobExperiences: JobExperienceBaseFragment[],
) => jobExperiences.map((jobExperience) => ({
  label: i18n.t(`${Namespaces.Form}:${jobExperience.slug}`),
  value: `${jobExperience.id}`,
}));

interface FieldProps {
  jobExperience: SelectOption | null
}

type Props = FormFieldProps<JobExperienceBaseFragment | null, FieldProps>

export const ProfileJobExperienceInput: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Form]);

  const jobExperiencesQueryResult = useJobExperiencesQuery();

  const jobExperiences = useMemo(
    () => jobExperiencesQueryResult.data?.jobExperiences ?? [],
    [jobExperiencesQueryResult],
  );
  const { initialValue, setValue } = props;

  useEffect(() => {
    if (initialValue) {
      setValue('jobExperience', ({
        label: t<string>(`${Namespaces.Form}:${initialValue.slug}`),
        value: `${initialValue.id}`,
      }));
    }
  }, [initialValue, t, setValue]);

  return (
    <FormField
      disabled={props.formDisabled}
      label={{
        for: 'job-experience',
        text: t(`${Namespaces.Form}:job_experience_label`),
      }}
      error={props.errors.jobExperience}
      renderInput={(inputProps) => (
        <Select
          {...inputProps}
          control={props.control}
          name="jobExperience"
          id="job-experience"
          isDisabled={props.formDisabled}
          options={getJobExperiencesOptions(jobExperiences || [])}
          validation={{
            required: {
              value: true,
              message: 'job_experience_is_required',
            },
          }}
          placeholder={t(`${Namespaces.Form}:job_experience_label`)}
        />
      )}
    />
  );
};
