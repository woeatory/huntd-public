import { useMemo } from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { CandidateProfile, CityTypes } from '@/controllers/graphql/generated';
import { CandidateProfileMetaItems } from '../candidateProfile.typedefs';

export interface MetaItem {
  name: CandidateProfileMetaItems,
  text: string,
}
interface UseCandidateProfileMetaItems {
  (profile?: CandidateProfile | null): MetaItem[]
}

export const useCandidateProfileMetaItems: UseCandidateProfileMetaItems = (
  profile,
) => {
  const { t } = useTranslation([
    Namespaces.Common,
    Namespaces.Form,
  ]);
  const location = profile?.cities
    ?.find((city) => city.type === CityTypes.CandidateCity);

  const annualSalary = profile?.salary
    ? +((profile.salary * 12) * 0.001).toFixed(1)
    : 0;

  let monthlySalary: string | number = profile?.salary
    ? Math.round(profile.salary)
    : 0;

  if (monthlySalary > 1000) {
    monthlySalary = `${+(monthlySalary * 0.001).toFixed(1)}k`;
  }

  const salaryInfo = `${t(`${Namespaces.Common}:usd_sign`)}${annualSalary}k `
    + `(${t(`${Namespaces.Common}:usd_sign`)}${monthlySalary} `
    + `/ ${t(`${Namespaces.Common}:month_salary`).toLowerCase()})`;

  return useMemo(
    () => {
      if (!profile) {
        return [];
      }

      return [
        {
          name: CandidateProfileMetaItems.Location,
          text: location ? `${location.cityCountryName}, ${location.cityName}` : '',
        },
        {
          name: CandidateProfileMetaItems.JobExperience,
          text: `${t(`${Namespaces.Form}:${profile.jobExperience?.slug || 'job_experience_not_filled'}`)}`,
        },
        {
          name: CandidateProfileMetaItems.Salary,
          text: profile.salary
            ? salaryInfo
            : '',
        },
        {
          name: CandidateProfileMetaItems.EnglishLevel,
          text: `${t(`${Namespaces.Form}:${profile.englishLevel?.slug || 'english_level_not_filled'}`)}`,
        },
      ].filter((item) => item.text);
    },
    [profile, t, location, salaryInfo],
  );
};
