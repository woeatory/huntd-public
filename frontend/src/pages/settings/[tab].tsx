import React from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { ProfileLayout } from '@/components/Base/Layout/ProfileLayout';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { ProfileNamespaces } from '@/controllers/profile/profile.constants';
import { AccountSettingsModule } from '@/components/AccountSettingsModule';
import { SettingsTabs } from '@/controllers/settings/settings.typedefs';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { Routes } from '@/controllers/router/router.constants';

const AccountSettings = () => {
  const { query } = useRouter();

  const tab = query.tab as SettingsTabs;

  if (tab && !Object.values(SettingsTabs).includes(tab)) {
    return <Error statusCode={404} />;
  }

  return (
    <AccountSettingsModule tab={tab} />
  );
};

export default compose(
  withLayout(ProfileLayout),
  withApolloSSR,
  withNamespaces(ProfileNamespaces),
  withAuthUserPage({ redirectUrl: Routes.Settings }),
)(AccountSettings);
