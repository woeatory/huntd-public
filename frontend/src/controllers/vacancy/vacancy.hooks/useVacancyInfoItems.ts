import { useMemo } from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Vacancy } from '@/controllers/graphql/generated';
import { getFilledValue } from '@/lib/getFilledValue';
import { ProfileItemContent } from '@/controllers/profile/profile.constants';

interface VacancyInfoItem {
  title: string;
  content: string;
}
interface UseVacancyInfoItems {
  (vacancy?: Vacancy | null): VacancyInfoItem[]
}

export const UseVacancyInfoItems: UseVacancyInfoItems = (
  vacancy,
) => {
  const { t } = useTranslation(Namespaces.Vacancy);

  return useMemo(
    () => {
      if (!vacancy) {
        return [];
      }

      return [
        {
          title: t(`${Namespaces.Vacancy}:technologies_label`),
          content: getFilledValue(vacancy.technologies?.map((item) => item.name).join(', ')),
        },
        {
          title: t(`${Namespaces.Vacancy}:description_label`),
          content: getFilledValue(vacancy.jobDescription),
        },
      ].filter((item) => item.content
        && item.content !== ProfileItemContent.Empty);
    },
    [vacancy, t],
  );
};
