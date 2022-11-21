import React, {
  Dispatch, FC, SetStateAction, useEffect, useState,
} from 'react';
import dynamic from 'next/dynamic';
import { WorkPlacesActions } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/WorkPlacesActions';
import { LinkedInParseBlock } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/LinkedInParseBlock';
import { CandidateProfile } from '@/controllers/graphql/generated';
import { ProfileWorkPlaces } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/ProfileWorkPlaces';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { WorkPlaceCard } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/ProfileWorkPlaces/WorkPlaceCard';
import { WorkPlacesModal } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/WorkPlacesModal';
import { LinkedinFetchError } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/LinkedinFetchError/LinkedinFetchError';

interface Props {
  profile: CandidateProfile;
  setWorkPlacesBlockActive: Dispatch<SetStateAction<boolean>>;
}

const Modal = dynamic(
  async () => {
    const mod = await import('@/components/Base/Modal/Modal');

    return mod.Modal;
  },
  {
    ssr: false,
  },
);

export const WorkPlacesBlock: FC<Props> = (props) => {
  const {
    profile, setWorkPlacesBlockActive,
  } = props;

  const [fromLinkedInBlockActive, setFromLinkedInBlockActive] = useState(false);
  const [addManuallyFormActive, setAddManuallyFormActive] = useState(false);
  const [isNoExperienceFetched, setIsNoExperienceFetched] = useState(false);
  const [isOneWorkPlaceMode, setIsOneWorkPlaceMode] = useState(false);

  const {
    isModalOpened, openModal, closeModal,
  } = useModalState(false);

  const showActions = !fromLinkedInBlockActive
    && !profile?.workPlaces?.length
    && !addManuallyFormActive
    && !isNoExperienceFetched;

  const shouldProfileWorkPlacesBeShown = !fromLinkedInBlockActive;

  useEffect(() => {
    setWorkPlacesBlockActive(fromLinkedInBlockActive);
  }, [fromLinkedInBlockActive, setWorkPlacesBlockActive]);

  return (
    <>
      {fromLinkedInBlockActive && (
        <LinkedInParseBlock
          setFromLinkedInBlockActive={setFromLinkedInBlockActive}
          setIsNoExperienceFetched={setIsNoExperienceFetched}
          candidateProfileId={profile.id}
        />
      )}

      {isNoExperienceFetched && (
        <LinkedinFetchError
          setIsNoExperienceFetched={setIsNoExperienceFetched}
          setAddManuallyFormActive={setAddManuallyFormActive}
          setIsOneWorkPlaceMode={setIsOneWorkPlaceMode}
        />
      )}

      {showActions && (
        <WorkPlacesActions
          setFromLinkedInBlockActive={setFromLinkedInBlockActive}
          setAddManuallyFormActive={setAddManuallyFormActive}
        />
      )}
      {addManuallyFormActive && (
        <WorkPlaceCard
          isNewForm
          isOneWorkPlaceMode={isOneWorkPlaceMode}
          setNewFormActive={setAddManuallyFormActive}
          candidateProfileId={profile.id}
        />
      )}
      {shouldProfileWorkPlacesBeShown
        && !!profile?.workPlaces?.length
        && (
          <ProfileWorkPlaces
            profileWorkPlaces={profile.workPlaces}
            candidateProfileId={profile.id}
            openModal={openModal}
            setIsOneWorkPlaceMode={setIsOneWorkPlaceMode}
          />
        )}
      <Modal isOpen={isModalOpened} closeModal={closeModal}>
        <WorkPlacesModal
          closeModal={closeModal}
          setFromLinkedInBlockActive={setFromLinkedInBlockActive}
        />
      </Modal>
    </>
  );
};
