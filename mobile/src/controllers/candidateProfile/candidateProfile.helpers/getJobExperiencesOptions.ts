import { TFunction } from 'i18next';
import { JobExperience } from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { SelectOption } from '@/controllers/form/form.constants';

interface GetJobExperiencesOptions {
  (jobExperiences: JobExperience[], t: TFunction): SelectOption[];
}

export const getJobExperiencesOptions: GetJobExperiencesOptions = (
  jobExperiences, t,
) => jobExperiences.map(((jobExperience) => ({
  value: String(jobExperience.id),
  label: t(`${Namespaces.Form}:${jobExperience.slug}`),
})));
