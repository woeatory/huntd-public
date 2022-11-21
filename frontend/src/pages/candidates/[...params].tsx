import React, { useEffect } from 'react';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { BackToTopButton } from '@/components/Base/BackToTopButton';
import { CandidateProfilesList } from '@/components/Profile/ProfilesListModule/CandidateProfilesList';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';
import { analytics } from '@/controllers/analytics/analytics.client';

const Candidates = () => {
  useEffect(() => {
    analytics.sendEvent(
      analytics.events.pageInteraction.VisitListingPage,
      {
        route: 'candidates',
      },
    );
  }, []);

  return (
    <>
      <div className="grid-container mb-60">
        <CandidateProfilesList />
      </div>

      <BackToTopButton />
    </>
  );
};

export default compose(
  withLayout(DynamicLayout),
  withApolloSSR,
  withNamespaces([
    Namespaces.Auth,
    Namespaces.Common,
    Namespaces.Profile,
    Namespaces.Form,
    Namespaces.Timezones,
    Namespaces.Chat,
    Namespaces.Candidates,
  ]),
  withNoJoinCodePage,
)(Candidates);
