import React from 'react';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';
import { CompaniesLanding } from '@/components/CompaniesLanding';
import { BottomlessLayout } from '@/components/Base/Layout/BottomlessLayout';

const CompaniesHomepage = () => <CompaniesLanding />;

export default compose(
  withLayout(BottomlessLayout),
  withApolloSSR,
  withNamespaces([
    Namespaces.Common,
    Namespaces.CompaniesLanding,
    Namespaces.Profile,
  ]),
  withNoJoinCodePage,
)(CompaniesHomepage);
