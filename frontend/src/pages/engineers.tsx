import React from 'react';
import { EngineersLanding } from '@/components/Engineers/EngineersLanding';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';
import { compose } from '@/lib/compose';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { SimpleLayout } from '@/components/Base/Layout/SimpleLayout';

const EngineersPage = () => (
  <EngineersLanding />
);

export default compose(
  withLayout(SimpleLayout),
  withNoJoinCodePage,
  withNamespaces([
    Namespaces.Engineers,
    Namespaces.Form,
    Namespaces.Home,
    Namespaces.Auth,
  ]),
  withApolloSSR,
)(EngineersPage);
