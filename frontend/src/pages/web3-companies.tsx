import React from 'react';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';
import { compose } from '@/lib/compose';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Web3CompaniesLanding } from '@/components/Web3Companies/Web3CompaniesLanding';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';

const Web3CompaniesPage = () => (
  <Web3CompaniesLanding />
);

export default compose(
  withLayout(DynamicLayout),
  withNoJoinCodePage,
  withNamespaces([
    Namespaces.Engineers,
    Namespaces.Form,
    Namespaces.Home,
    Namespaces.Auth,
  ]),
  withApolloSSR,
)(Web3CompaniesPage);
