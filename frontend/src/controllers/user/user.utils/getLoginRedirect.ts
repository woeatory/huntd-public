import { PrimaryProfile, User } from '@/controllers/graphql/generated';
import { Routes } from '@/controllers/router/router.constants';

interface GetLoginRedirect {
  (user: User): string
}

export const getLoginRedirect: GetLoginRedirect = (user) => {
  switch (user.primaryProfile) {
    case PrimaryProfile.Candidate: {
      return `${Routes.ProfilePreview}/candidate`;
    }

    case PrimaryProfile.Recruiter: {
      return `${Routes.ProfilePreview}/recruiter`;
    }

    default: {
      return Routes.ChooseProfile;
    }
  }
};
