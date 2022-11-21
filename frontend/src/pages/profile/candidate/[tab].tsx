import React from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { ProfileLayout } from '@/components/Base/Layout/ProfileLayout';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { CandidateProfileModule } from '@/components/Profile/CandidateProfileModule';
import { CandidateProfileTabs } from '@/controllers/candidateProfile/candidateProfile.typedefs';
import { ProfileNamespaces } from '@/controllers/profile/profile.constants';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { Routes } from '@/controllers/router/router.constants';

const ProfileCandidateTechSkills = () => {
  const { query } = useRouter();

  const tab = query.tab as CandidateProfileTabs;

  if (tab && !Object.values(CandidateProfileTabs).includes(tab)) {
    return <Error statusCode={404} />;
  }

  return (
    <CandidateProfileModule tab={tab} />
  );
};

export default compose(
  withLayout(ProfileLayout),
  withApolloSSR,
  withNamespaces(ProfileNamespaces),
  withAuthUserPage({ redirectUrl: `${Routes.Profile}/candidate` }),
)(ProfileCandidateTechSkills);
