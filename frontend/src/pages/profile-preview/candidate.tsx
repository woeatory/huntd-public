import React from 'react';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { ProfileNamespaces } from '@/controllers/profile/profile.constants';
import { CandidateProfilePreviewModule } from '@/components/Profile/ProfilePreview/CandidateProfilePreviewModule/CandidateProfilePreviewModule';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { ProfilePreviewLayout } from '@/components/Base/Layout/ProfilePreviewLayout';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';

const ProfileCandidatePreview = () => (
  <CandidateProfilePreviewModule />
);

export default compose(
  withLayout(ProfilePreviewLayout),
  withApolloSSR,
  withNamespaces(ProfileNamespaces),
  withAuthUserPage(),
  withNoJoinCodePage,
)(ProfileCandidatePreview);
