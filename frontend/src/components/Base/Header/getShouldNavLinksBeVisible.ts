import { PrimaryProfile, User } from '@/controllers/graphql/generated';
import { ProfileRoutes, Routes } from '@/controllers/router/router.constants';

export const getShouldNavLinksBeVisible = (
  user: User | null,
  pathname: string,
) => {
  const isFirstTimeFillingProfile
  = user?.primaryProfile === PrimaryProfile.Recruiter
    ? user?.isFirstTimeFillingRecruiterProfile
    : user?.isFirstTimeFillingCandidateProfile;

  switch (true) {
    case (isFirstTimeFillingProfile && pathname.includes(Routes.Recruiter)):
    case (isFirstTimeFillingProfile
      && pathname.includes(ProfileRoutes.Contacts)):
    case (isFirstTimeFillingProfile
      && pathname.includes(ProfileRoutes.Candidate)):
    case (pathname.includes(ProfileRoutes.PerfectCandidate)):
    case (pathname === Routes.ChooseProfile):
    case (isFirstTimeFillingProfile && pathname.includes(Routes.FAQ)):
    case (isFirstTimeFillingProfile && pathname.includes(Routes.AboutUs)):
    case (isFirstTimeFillingProfile && pathname.includes(Routes.Pricing)):
      return false;

    default:
      return true;
  }
};
