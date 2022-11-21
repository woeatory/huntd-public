import { useMemo } from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Vacancy } from '@/controllers/graphql/generated';

interface UseVacancyMetaItems {
  (vacancy?: Vacancy | null): string[]
}

export const UseVacancyMetaItems: UseVacancyMetaItems = (
  vacancy,
) => {
  const { t } = useTranslation([Namespaces.Form, Namespaces.Vacancy]);

  return useMemo(
    () => {
      const translates: string[] = [];

      if (!vacancy) {
        return translates;
      }

      if (vacancy.jobCategory) {
        translates.push(`${t(`${Namespaces.Vacancy}:job_category_${vacancy.jobCategory.toLowerCase()}`)}`);
      }

      if (vacancy.jobType) {
        translates.push(`${t(`${Namespaces.Vacancy}:job_type_${vacancy.jobType.toLowerCase()}`)}`);
      }

      if (vacancy.jobExperience) {
        translates.push(`${t(`${Namespaces.Form}:${vacancy.jobExperience?.slug}`)}`);
      }

      if (vacancy.englishLevel) {
        translates.push(`${t(`${Namespaces.Form}:${vacancy.englishLevel?.slug}`)}`);
      }

      return translates.filter(Boolean);
    },
    [vacancy, t],
  );
};
