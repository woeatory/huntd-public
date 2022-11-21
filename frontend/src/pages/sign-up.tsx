import React from 'react';
import cn from 'classnames';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { compose } from '@/lib/compose';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { SignUpModule } from '@/components/Authentication/SignUpModule';
import { AuthLayout } from '@/components/Base/Layout/AuthLayout';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Link } from '@/controllers/i18n/i18n.client';
import { Routes } from '@/controllers/router/router.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { AuthNamespaces } from '@/controllers/auth/auth.constants';
import { withAnonymousPage } from '@/controllers/page/page.quards/withAnonymousPage';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';

const SignUpPage = () => {
  const { t } = useTranslation([Namespaces.Auth]);

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell xlarge-7 xlarge-offset-3 large-9 large-offset-2">
          <h1 className={cn(typography.h1, 'mt-60 mb-8')}>
            {t(`${Namespaces.Auth}:sign_up_page_title`)}
          </h1>

          <p className={cn(typography.underhead, 'c-citrus mb-40')}>
            {t(`${Namespaces.Auth}:sign_up_page_underhead`)}
          </p>

          <div className="mb-24">
            <SignUpModule />
          </div>

          <p className={cn(typography.text, 'c-gray')}>
            {t(`${Namespaces.Auth}:sign_in_text`)}
            {' '}
            <Link href={Routes.SignIn}>
              <a className={typography.link}>
                {t(`${Namespaces.Auth}:sign_in_link`)}
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default compose(
  withLayout(AuthLayout),
  withApolloSSR,
  withNamespaces(AuthNamespaces),
  withNoJoinCodePage,
  withAnonymousPage,
)(SignUpPage);
