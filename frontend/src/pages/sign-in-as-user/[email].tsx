import React from 'react';
import cn from 'classnames';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { compose } from '@/lib/compose';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import typography from '@/ui/typography/typography.module.scss';
import { AuthNamespaces } from '@/controllers/auth/auth.constants';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { SimpleLayout } from '@/components/Base/Layout/SimpleLayout';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { ImpersonateLoginModule } from '@/components/Authentication/ImpersonateLoginModule';

const ImpersonateLoginPage = () => (
  <div className="grid-container">
    <div className="grid-x grid-margin-x">
      <div className="cell xlarge-7 xlarge-offset-3 large-9 large-offset-2">
        <h1 className={cn(typography.h1, 'mt-60 mb-8')}>
          Impersonate login
        </h1>

        <p className={cn(typography.underhead, 'c-citrus mb-40')}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Enter user's email below to login into their account
        </p>

        <div className="mb-24">
          <ImpersonateLoginModule />
        </div>
      </div>
    </div>
  </div>
);

export default compose(
  withLayout(SimpleLayout),
  withApolloSSR,
  withNamespaces(AuthNamespaces),
  withAuthUserPage(),
)(ImpersonateLoginPage);
