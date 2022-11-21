import React from 'react';
import { RecruiterProfileStatus } from '@/controllers/graphql/generated';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useLatestRecruiterProfile';
import { DeactivateRecruiterProfileButton } from '@/components/Profile/HiringManagementModule/RecruiterProfileFormActions/DeactivateRecruiterProfileButton';
import { ActivateRecruiterProfileButton } from '@/components/Profile/HiringManagementModule/RecruiterProfileFormActions/ActivateRecruiterProfileButton';

export const RecruiterProfileFormActions = () => {
  const [profile] = useLatestRecruiterProfile();

  switch (profile?.status) {
    case RecruiterProfileStatus.Active:
    case RecruiterProfileStatus.OnReview:
    case RecruiterProfileStatus.Rejected:
      return <DeactivateRecruiterProfileButton />;

    case RecruiterProfileStatus.Inactive:
      return (
        <ActivateRecruiterProfileButton />
      );

    default:
      return null;
  }
};
