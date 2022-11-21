import dynamic from 'next/dynamic';
import React, { FC, useMemo } from 'react';
import { RecruiterProfileNavigationModes, RecruiterProfileTabs } from '@/controllers/recruiterProfile/recruiterProfile.typedefs';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { RecruiterProfileNavigation } from '@/components/Profile/HiringManagementModule/RecruiterProfileNavigation';
import { Features } from '@/controllers/features/features.constants';

interface Props {
  tab?: RecruiterProfileTabs
}

const Subscriptions = dynamic(
  async () => {
    const mod = await import('@/components/Profile/HiringManagementModule/Subscriptions');

    return mod.Subscriptions;
  },
  {
    ssr: false,
  },
);

const MessageTemplates = dynamic(
  async () => {
    const mod = await import('@/components/Profile/HiringManagementModule/MessageTemplates');

    return mod.MessageTemplates;
  },
);

const Hirings = dynamic(
  async () => {
    const mod = await import('@/components/Profile/HiringManagementModule/Hirings');

    return mod.Hirings;
  },
);

const Connections = dynamic(
  async () => {
    const mod = await import('@/components/Profile/HiringManagementModule/Connections');

    return mod.Connections;
  },
);

export const HiringManagementModule: FC<Props> = (props) => {
  const hiringsFeature = useFeature(Features.RecruiterHirings);

  const { tab } = props;

  const CurrentComponent = useMemo(() => {
    switch (tab) {
      case RecruiterProfileTabs.Templates:
        return MessageTemplates;
      case RecruiterProfileTabs.Hirings:
        return hiringsFeature.isEnabled()
          ? Hirings
          : Subscriptions;
      case RecruiterProfileTabs.Connections:
        return hiringsFeature.isEnabled()
          ? Connections
          : Subscriptions;
      case RecruiterProfileTabs.Subscriptions:
      default: {
        return Subscriptions;
      }
    }
  }, [tab, hiringsFeature]);

  return (
    <>
      <RecruiterProfileNavigation
        mode={RecruiterProfileNavigationModes.HiringManagement}
      />

      <CurrentComponent />
    </>
  );
};
