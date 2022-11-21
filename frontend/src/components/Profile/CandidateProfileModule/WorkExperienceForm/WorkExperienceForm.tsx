import React, {
  useState, FC, useCallback,
} from 'react';
import { Router } from '@/controllers/i18n/i18n.client';
import { CandidateProfileRoutes } from '@/controllers/router/router.constants';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { analytics } from '@/controllers/analytics/analytics.client';
import { WorkPlacesBlock } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock';
import { WorkPlacesHintBlock } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/WorkPlacesHintBlock';
import { Button } from '@/ui/buttons/Button';

interface Props {
  isFirstTimeFillingProfile: boolean;
}

export const WorkExperienceForm: FC<Props> = (props) => {
  const { isFirstTimeFillingProfile } = props;

  const { t } = useTranslation([Namespaces.Profile]);

  const [profile, { loading: profileLoading }] = useLatestCandidateProfile();

  const [workPlacesBlockActive, setWorkPlacesBlockActive] = useState(false);

  const onSave = useCallback(() => {
    if (isFirstTimeFillingProfile) {
      analytics.sendEvent(
        analytics.events.candidateSignUpFlow.WorkPlacesStep,
        {},
      );
      Router.push(CandidateProfileRoutes.Bio);
    }
  }, [isFirstTimeFillingProfile]);

  return (
    <>
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          {!workPlacesBlockActive
          && !!profile?.workPlaces?.length
          && (
            <WorkPlacesHintBlock />
          )}

          {profile && (
            <WorkPlacesBlock
              profile={profile}
              setWorkPlacesBlockActive={setWorkPlacesBlockActive}
            />
          )}
        </div>
      </div>
      {profile?.workPlaces?.length
        && isFirstTimeFillingProfile
        && !workPlacesBlockActive
        && (
          <div className="grid-container">
            <div className="grid-x grid-margin-x">
              <div className="cell large-3 large-offset-3">
                <Button
                  mode={Button.mode.Primary}
                  disabled={profileLoading}
                  type="button"
                  className="wide mb-16"
                  onClick={onSave}
                  text={t(`${Namespaces.Profile}:save-and-continue`)}
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};
