import React from 'react';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { compose } from '@/lib/compose';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { AuthLayout } from '@/components/Base/Layout/AuthLayout';
import { AuthNamespaces } from '@/controllers/auth/auth.constants';
import { ResetPasswordModule } from '@/components/Authentication/ResetPasswordModule';
import { withAnonymousPage } from '@/controllers/page/page.quards/withAnonymousPage';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';

const ResetPassword = () => (
  <div className="grid-container mt-100">
    <div className="grid-x grid-margin-x">
      <div className="cell xlarge-6 xlarge-offset-3 large-8 large-offset-2">
        <ResetPasswordModule />
      </div>
    </div>
  </div>
);

export default compose(
  withLayout(AuthLayout),
  withApolloSSR,
  withNamespaces(AuthNamespaces),
  withAnonymousPage,
)(ResetPassword);
