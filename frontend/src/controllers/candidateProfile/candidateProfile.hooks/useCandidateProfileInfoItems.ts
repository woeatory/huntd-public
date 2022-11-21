import { useMemo } from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { CandidateProfile, CityTypes } from '@/controllers/graphql/generated';
import { getFilledValue } from '@/lib/getFilledValue';

import { ProfileItemContent } from '@/controllers/profile/profile.constants';
import { EmploymentLocations } from '@/controllers/candidateProfile/candidateProfile.constants';

interface ProfileInfoItem {
  title: string;
  content: string;
  isHidden?: boolean;
}
interface UseCandidateProfileInfoItems {
  (profile?: CandidateProfile | null): ProfileInfoItem[]
}

export const useCandidateProfileInfoItems: UseCandidateProfileInfoItems = (
  profile,
) => {
  const { t } = useTranslation([Namespaces.Profile, Namespaces.Form]);

  const specializationsTitles = profile?.specializations?.map(
    (el) => el.name,
  ).join(', ');

  const cities = profile?.cities?.filter(
    (city) => city.type !== CityTypes.CandidateCity,
  )
    .map((city) => city.cityName)
    .join(', ');

  const isRemote = profile?.employmentLocations
    ?.some((location) => location.slug.includes(EmploymentLocations.Remote));

  const readyToWorkContent = useMemo(() => {
    const content: string[] = [];

    if (isRemote) {
      content.push(t(`${Namespaces.Profile}:remote_location`));
    }

    if (cities?.length) {
      content.push(cities);
    }

    return content.join(',');
  }, [isRemote, cities, t]);

  return useMemo(
    () => {
      if (!profile) {
        return [];
      }

      return [
        {
          title: t(`${Namespaces.Form}:achievements_label`),
          content: getFilledValue(profile.achievements),
        },
        {
          title: t(`${Namespaces.Profile}:core_technical_skills`),
          content: getFilledValue(profile.technologies?.map((item) => item.name).join(', ')),
        },
        {
          title: t(`${Namespaces.Form}:work_expectations_label`),
          content: getFilledValue(profile.workExpectations),
        },
        {
          title: t(`${Namespaces.Profile}:considering_roles`),
          content: getFilledValue(specializationsTitles),
        },
        {
          title: t(`${Namespaces.Profile}:ready_to_work`),
          content: readyToWorkContent,
        },
        {
          title: t(`${Namespaces.Profile}:experience_label`),
          content: getFilledValue(profile.experienceDescription),
          isHidden: true,
        },
      ].filter((item) => item.content
        && item.content !== ProfileItemContent.Empty);
    },
    [profile, t, readyToWorkContent, specializationsTitles],
  );
};
