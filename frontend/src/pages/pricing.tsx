import React from 'react';
import { compose } from '@/lib/compose';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { GeneralContent } from '@/components/GeneralContent/GeneralContent';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';
import { BottomlessLayout } from '@/components/Base/Layout/BottomlessLayout';

const PricingPage = () => (
  <GeneralContent />
);

export default compose(
  withLayout(BottomlessLayout),
  withNamespaces([
    Namespaces.Pricing,
    Namespaces.Profile,
    Namespaces.Common,
  ]),
  withApolloSSR,
  withNoJoinCodePage,
)(PricingPage);
