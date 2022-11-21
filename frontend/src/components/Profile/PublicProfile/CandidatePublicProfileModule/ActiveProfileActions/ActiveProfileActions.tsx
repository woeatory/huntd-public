import React, { memo } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { Button } from '@/ui/buttons/Button';
import { CandidateProfile } from '@/controllers/graphql/generated';
import { CandidatePublicProfileActions } from '@/components/Profile/PublicProfile/CandidatePublicProfileActions';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import ProfileStatusModule from '@/components/Profile/ProfilePreview/ProfileStatus/ProfileStatus.module.scss';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useLatestRecruiterProfile';
import { ProfileStatus } from '@/components/Profile/ProfilePreview/ProfileStatus/ProfileStatus';
import styles from './ActiveProfileActions.module.scss';

interface Props {
  isModalOpened: boolean;
  closeModal: () => void;
  handleClick: () => void;
  profile: CandidateProfile;
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

export const ActiveProfileActions = memo<Props>(
  (props) => {
    const {
      isModalOpened, closeModal, profile, handleClick,
    } = props;
    const { t } = useTranslation([Namespaces.Form]);

    const [user] = useAuthUser();
    const [recruiterProfile] = useLatestRecruiterProfile();

    return (
      <div className={cn(styles.activeProfile, 'cell large-4 large-offset-1')}>
        {recruiterProfile
          ? (
            <Button
              title="send message"
              onClick={handleClick}
              mode={Button.mode.Primary}
              text={t(`${Namespaces.Form}:send-message-button`)}
            />
          )
          : (
            <ProfileStatus
              className={ProfileStatusModule.activeStatus}
              text={t(`${Namespaces.Profile}:profile_active`)}
            />
          )}

        {isModalOpened && (
          <Modal
            isOpen={isModalOpened}
            closeModal={closeModal}
          >
            <CandidatePublicProfileActions
              candidateProfileId={profile.id}
              candidateProfile={profile}
              closeModal={closeModal}
              recruiterProfile={recruiterProfile}
              user={user}
            />
          </Modal>
        )}
      </div>
    );
  },
);
