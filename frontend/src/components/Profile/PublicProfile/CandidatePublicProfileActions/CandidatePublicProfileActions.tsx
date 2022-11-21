import React, { memo } from 'react';
import { CandidateProfile, RecruiterProfile, User } from '@/controllers/graphql/generated';
import { ConnectProfileAction } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectProfileAction';

interface Props {
  user: User | null;
  candidateProfileId: number
  candidateProfile: CandidateProfile
  recruiterProfile: RecruiterProfile | null
  closeModal: () => void
}

export const CandidatePublicProfileActions = memo<Props>(
  ({
    candidateProfileId,
    candidateProfile,
    closeModal,
    recruiterProfile,
    user,
  }) => (
    <ConnectProfileAction
      isAnonymous={!user}
      candidateProfileId={candidateProfileId}
      candidateProfile={candidateProfile}
      recruiterProfileId={recruiterProfile?.id}
      recruiterProfileStatus={recruiterProfile?.status}
      closeModal={closeModal}
    />
  ),
);
