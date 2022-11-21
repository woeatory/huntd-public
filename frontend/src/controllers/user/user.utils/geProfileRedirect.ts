import { PrimaryProfile, User } from '@/controllers/graphql/generated';
import { Routes } from '@/controllers/router/router.constants';

interface getProfileRedirect {
  (user: User): string
}

export const getProfileRedirect: getProfileRedirect = (user) => {
  switch (user.primaryProfile) {
    case PrimaryProfile.Candidate: {
      return `${Routes.Profile}/candidate`;
    }

    case PrimaryProfile.Recruiter: {
      return `${Routes.Profile}/recruiter`;
    }

    default: {
      return Routes.ChooseProfile;
    }
  }
};
