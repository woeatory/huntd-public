import React, { FC } from 'react';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { CandidateProfileStatus } from '@/controllers/graphql/generated';
import { ReviewCandidateProfileButton } from '@/components/Profile/CandidateProfileModule/CandidateProfileFormActions/ReviewCandidateProfileButton';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';

interface Props {
  openModal: () => void;
}

export const CandidateProfileFormActions: FC<Props> = (props) => {
  const { openModal } = props;
  const [profile] = useLatestCandidateProfile();

  const [user] = useAuthUser();

  const isFirstTimeFillingProfile = (
    user?.isFirstTimeFillingCandidateProfile ?? false
  );

  switch (profile?.status) {
    case CandidateProfileStatus.Active:
    case CandidateProfileStatus.OnReview:
    case CandidateProfileStatus.Rejected:
    case CandidateProfileStatus.Inactive: {
      return <ReviewCandidateProfileButton openModal={openModal} />;
    }

    case CandidateProfileStatus.Draft: {
      if (!isFirstTimeFillingProfile) {
        return <ReviewCandidateProfileButton openModal={openModal} />;
      }

      return null;
    }

    default:
      return null;
  }
};
