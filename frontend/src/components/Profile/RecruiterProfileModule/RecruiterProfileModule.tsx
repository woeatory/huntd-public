import React, { FC, useMemo } from 'react';
import { RecruiterProfileNavigationModes, RecruiterProfileTabs } from '@/controllers/recruiterProfile/recruiterProfile.typedefs';
import { CompanyInfoForm } from '@/components/Profile/RecruiterProfileModule/CompanyInfoForm';
import { RecruiterProfileNavigation } from '@/components/Profile/HiringManagementModule/RecruiterProfileNavigation';
import { ProfileContactsForm } from '../ProfileContactsModule/ProfileContactsForm';

interface Props {
  tab: RecruiterProfileTabs
}

export const RecruiterProfileModule: FC<Props> = (props) => {
  const { tab } = props;

  const CurrentComponent = useMemo(() => {
    switch (tab) {
      case RecruiterProfileTabs.Contacts:
        return ProfileContactsForm;
      case RecruiterProfileTabs.CompanyInfo:
      default: {
        return CompanyInfoForm;
      }
    }
  }, [tab]);

  return (
    <>
      <RecruiterProfileNavigation
        mode={RecruiterProfileNavigationModes.EditProfile}
      />

      <CurrentComponent />
    </>
  );
};
