import React from 'react';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { compose } from '@/lib/compose';
import { AuthLayout } from '@/components/Base/Layout/AuthLayout';
import { AuthNamespaces } from '@/controllers/auth/auth.constants';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { ConfirmEmailModule } from '@/components/Authentication/ConfirmEmailModule/ConfirmEmailModule';

const ConfirmEmail = () => (
  <div className="grid-container mt-100">
    <div className="grid-x grid-margin-x">
      <div className="cell xlarge-6 xlarge-offset-3 large-8 large-offset-2">
        <ConfirmEmailModule />
      </div>
    </div>
  </div>
);

export default compose(
  withLayout(AuthLayout),
  withNamespaces(AuthNamespaces),
)(ConfirmEmail);
