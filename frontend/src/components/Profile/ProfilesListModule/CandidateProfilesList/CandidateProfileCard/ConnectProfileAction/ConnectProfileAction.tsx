import React, { memo } from 'react';
import { RecruiterProfileStatus, CandidateProfile } from '@/controllers/graphql/generated';
import { SignUpLink } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/SignUpLink';
import { CreateRecruiterProfileLink } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/CreateRecruiterProfileLink';
import { RecruiterProfileNotActive } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/RecruiterProfileNotActive';
import { ConnectCandidateProfile } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectCandidateProfile';

interface Props {
  isAnonymous: boolean;
  recruiterProfileId?: number;
  recruiterProfileStatus?: RecruiterProfileStatus;
  candidateProfileId: number;
  candidateProfile: CandidateProfile;
  closeModal: () => void;
}
export const ConnectProfileAction = memo<Props>(
  (props) => {
    const {
      isAnonymous,
      candidateProfileId,
      recruiterProfileId,
      recruiterProfileStatus,
      candidateProfile,
      closeModal,
    } = props;

    if (isAnonymous) {
      return <SignUpLink />;
    }

    if (!recruiterProfileId) {
      return <CreateRecruiterProfileLink />;
    }

    if (recruiterProfileStatus !== RecruiterProfileStatus.Active) {
      return <RecruiterProfileNotActive />;
    }

    return (
      <ConnectCandidateProfile
        candidateProfileId={candidateProfileId}
        recruiterProfileId={recruiterProfileId}
        candidateProfile={candidateProfile}
        closeModal={closeModal}
      />
    );
  },
);
