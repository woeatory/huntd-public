import React, { FC, useMemo } from 'react';
import { SettingsTabs } from '@/controllers/settings/settings.typedefs';
import { SocialProfilesBlock } from '@/components/AccountSettingsModule/SocialProfilesBlock';
import { AccountSettingsNavigation } from '@/components/AccountSettingsModule/AccountSettingsNavigation';
import { ChangePasswordBlock } from '@/components/AccountSettingsModule/ChangePasswordBlock';

interface Props {
  tab?: SettingsTabs
}

export const AccountSettingsModule: FC<Props> = (props) => {
  const { tab } = props;

  const CurrentComponent = useMemo(() => {
    switch (tab) {
      case SettingsTabs.SocialProfiles:
        return SocialProfilesBlock;
      case SettingsTabs.ChangePassword:
        return ChangePasswordBlock;
      default: {
        return SocialProfilesBlock;
      }
    }
  }, [tab]);

  return (
    <>
      <AccountSettingsNavigation />

      <CurrentComponent />
    </>
  );
};
