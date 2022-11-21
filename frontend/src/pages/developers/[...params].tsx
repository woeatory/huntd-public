import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
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
import { Web3FilterSearchQuery } from '@/controllers/router/router.constants';

const Developers = () => {
  const router = useRouter();

  const web3SearchQueries: string[] = Object.values(Web3FilterSearchQuery);

  useEffect(() => {
    if (router.query.params
      && web3SearchQueries.includes(router.query.params[0])
    ) {
      analytics.sendEvent(
        analytics.events.pageInteraction.VisitListingPage,
        {
          route: 'developers',
          tech: router.query.params[0],
        },
      );
    }
  }, [router.query.params, web3SearchQueries]);

  return (
    <>
      <div className="grid-container mb-60">
        <CandidateProfilesList searchParams={router.query.params as string[]} />
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
)(Developers);
