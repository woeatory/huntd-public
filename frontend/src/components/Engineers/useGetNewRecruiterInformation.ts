import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  useLatestRecruiterProfileByUserIdQuery,
  usePublicCandidateProfilesQuery,
  useUserByUsernameQuery,
  useUserSearchSubscriptionsByUserIdQuery,
} from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';

enum MockEngineerData {
  Technologies = 'Javascript, React, CSS',
  Role = 'Frontend',
  Experience = '3-5 years',
}

export const useGetNewRecruiterInformation = () => {
  const { query } = useRouter();
  const { t } = useTranslation([Namespaces.Form]);

  const { data: userData } = useUserByUsernameQuery({
    variables: {
      username: query.companyId as string,
    },
  });

  const user = userData?.userByUsername ?? null;

  const { data: recruiterData } = useLatestRecruiterProfileByUserIdQuery({
    variables: {
      userId: user?.id,
    },
  });

  const recruiter = recruiterData?.latestRecruiterProfileByUserId;

  const { data: subscriptionData } = useUserSearchSubscriptionsByUserIdQuery({
    variables: {
      userId: user?.id,
    },
  });

  const subscription = subscriptionData?.userSearchSubscriptionsByUserId
    ? subscriptionData?.userSearchSubscriptionsByUserId[0]
    : null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename: _, ...where } = subscription?.searchParams ?? {};

  const { data } = usePublicCandidateProfilesQuery({
    variables: {
      where,
      options: {
        username: query.companyId as string,
      },
    },
  });

  const count = data?.publicCandidateProfiles.count;

  const technologies = useMemo(() => {
    if (subscription?.stringifiedSearchParams.technologies) {
      const technologiesList = subscription?.stringifiedSearchParams
        .technologies.map((technology) => technology.name);

      return technologiesList.length > 3
        ? technologiesList.slice(0, 3).join(', ')
        : technologiesList.join(', ');
    }

    return MockEngineerData.Technologies;
  }, [subscription]);

  const role = useMemo(() => {
    if (subscription?.searchParams.specializations) {
      const { specializations } = subscription.searchParams;

      return specializations[0][0] + specializations[0].slice(1).toLowerCase();
    }

    return MockEngineerData.Role;
  }, [subscription]);

  const experience = useMemo(() => {
    if (subscription?.stringifiedSearchParams.jobExperiences) {
      const { jobExperiences } = subscription.stringifiedSearchParams;

      return t(`${Namespaces.Form}:${jobExperiences[0]?.slug}`);
    }

    return MockEngineerData.Experience;
  }, [subscription, t]);

  return {
    user,
    recruiter,
    subscription: { technologies, role, experience },
    count,
  };
};
