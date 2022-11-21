import React from 'react';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';
import { Homepage } from '@/components/Homepage';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';

const Home = () => (
  <Homepage />
);

export default compose(
  withLayout(DynamicLayout),
  withApolloSSR,
  withNamespaces([
    Namespaces.Common,
    Namespaces.Auth,
    Namespaces.Validations,
    Namespaces.Form,
    Namespaces.ChooseProfile,
    Namespaces.Home,
    Namespaces.Chat,
    Namespaces.Profile,
    Namespaces.Vacancy,
    Namespaces.Candidates,
  ]),
  withNoJoinCodePage,
)(Home);
