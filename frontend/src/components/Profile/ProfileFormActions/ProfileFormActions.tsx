import React, { Dispatch, memo, SetStateAction } from 'react';
import { Button } from '@/ui/buttons/Button';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { ProfileEditModeActions } from '@/components/Profile/ProfileEditModeActions';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { PrimaryProfile } from '@/controllers/graphql/generated';

interface Props {
  handleSubmit: () => Promise<void>;
  discardChanges: () => void;
  loading: boolean;
  edited: boolean;
  setEdited: Dispatch<SetStateAction<boolean>>;
}
export const ProfileFormActions = memo<Props>((props) => {
  const {
    loading,
    edited,
    setEdited,
    handleSubmit,
    discardChanges,
  } = props;

  const { t } = useTranslation([Namespaces.Profile]);

  const [user] = useAuthUser();

  const isFirstTimeFillingProfile
    = user?.primaryProfile === PrimaryProfile.Recruiter
      ? user?.isFirstTimeFillingRecruiterProfile
      : user?.isFirstTimeFillingCandidateProfile;

  return isFirstTimeFillingProfile
    ? (
      <div className="cell large-3 large-offset-3">
        <Button
          mode={Button.mode.Primary}
          disabled={loading}
          type="button"
          className="wide mb-16"
          onClick={() => handleSubmit()}
          text={t(`${Namespaces.Profile}:save-and-continue`)}
        />
      </div>
    )
    : (
      <ProfileEditModeActions
        edited={edited}
        setEdited={setEdited}
        onSubmit={handleSubmit}
        discardChanges={discardChanges}
      />
    );
});
