import { useMemo } from 'react';
import { CandidateProfile } from '@/controllers/graphql/generated';
import { useCandidateProfileWorkPlaceDuration } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileWorkPlaceDuration';
import { WorkPlaceContent } from '@/components/Profile/ProfileWorkHistory';

type companySize = number | null | undefined;
type companySpecialization = string | null | undefined;

export const useCandidateProfileWorkPlacesInfo = (
  profile: CandidateProfile | null | undefined,
) => {
  const getDuration = useCandidateProfileWorkPlaceDuration();

  const getCompanySize = (sizeFrom: companySize, sizeTo: companySize) => {
    if (!sizeFrom && !sizeTo) {
      return null;
    }

    if (sizeFrom && sizeTo) {
      return `${sizeFrom} - ${sizeTo} people`;
    }

    if (!sizeFrom) {
      return `<${sizeTo} people`;
    }

    return `${sizeFrom}+ people`;
  };

  const getCompanySpecializations = (
    companySpecialities: companySpecialization,
    companyCategories: companySpecialization,
    companyIndustry: companySpecialization,
  ) => {
    const specialization = [];

    if (companyIndustry) {
      specialization.push(companyIndustry);
    }

    if (companyCategories) {
      specialization.push(...companyCategories.split(','));
    }

    if (companySpecialities) {
      specialization.push(...companySpecialities.split(','));
    }

    return specialization.length
      ? specialization
      : null;
  };

  const sortedWorkPlaces = useMemo(() => (
    profile?.workPlaces?.length
      ? [...profile?.workPlaces].sort(
        (a, b) => new Date(b.startDate).getTime()
          - new Date(a.startDate).getTime(),
      )
      : []), [profile?.workPlaces]);

  const groupedWorkplaces = sortedWorkPlaces.reduce(
    (acc: Record<string, WorkPlaceContent[]>, workPlace) => {
      const {
        title,
        companyName,
        description,
        startDate,
        endDate,
        companySizeFrom,
        companySizeTo,
        companyIndustry,
        companyFundingType,
        companyCategories,
        companySpecialities,
      } = workPlace;

      const { duration, workPlaceDate } = getDuration(
        startDate, endDate,
      );

      const companySize = getCompanySize(companySizeFrom, companySizeTo);

      const companySpecializations = getCompanySpecializations(
        companySpecialities, companyCategories, companyIndustry,
      );

      return {
        ...acc,
        [companyName]: [...acc[companyName] || [], {
          title,
          description,
          duration,
          workPlaceDate,
          companyInfo: {
            companySize,
            companySpecializations,
            companyFundingType,
          },
        }],
      };
    }, {},
  );

  const entries = groupedWorkplaces
    ? Object.entries(groupedWorkplaces)
    : [];

  return entries?.map((company) => {
    const [name, workplaces] = company;

    return {
      companyName: name,
      content: workplaces,
    };
  });
};
