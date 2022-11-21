import { useMemo } from 'react';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { CandidateProfile } from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';

interface ProfileSEOInfo {
  title: string;
  description: string;
}

interface UseCandidateProfileSEOInfo {
  (profile?: CandidateProfile | null): ProfileSEOInfo
}

export const useCandidateProfileSEOInfo: UseCandidateProfileSEOInfo = (
  profile,
) => {
  const { t } = useTranslation([Namespaces.Home]);

  let monthlySalary: string | number = profile?.salary
    ? Math.round(profile.salary)
    : 0;

  if (monthlySalary > 1000) {
    monthlySalary = `${+(monthlySalary * 0.001).toFixed(1)}k`;
  }

  const salaryInfo = `${t(`${Namespaces.Common}:usd_sign`)}${monthlySalary} `
    + `/ ${t(`${Namespaces.Common}:month_salary`).toLowerCase()}`;

  return useMemo(
    () => ({
      title: `${profile?.position}, ${profile?.cities?.map((city) => city.cityName) || 'Any city'}, ${salaryInfo}`,
      description: profile?.experienceDescription || t(`${Namespaces.Home}:win_win_recruiter_text`),
    }), [profile, salaryInfo, t],
  );
};
