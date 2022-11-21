import React, { FC, useEffect, useMemo } from 'react';
import App, { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { appWithTranslation } from '@/controllers/i18n/i18n.hocs/appWithTranslation';
import { compose } from '@/lib/compose';
import '@/style/main.scss';
import { SimpleLayout } from '@/components/Base/Layout/SimpleLayout';
import { withApolloApp } from '@/controllers/apollo/apollo.hocs/withApolloApp';
import { FlashMessageWrapper } from '@/components/Base/FlashMessage/FlashMessageWrapper';
import { ImpersonateLoginAlert } from '@/components/Authentication/ImpersonateLoginModule/ImpersonateLoginAlert';
import { useAuthUserQuery } from '@/controllers/graphql/generated';
import { analytics } from '@/controllers/analytics/analytics.client';
import { AdminSettingsModule } from '@/components/AdminSettingsModule/AdminSettingsModule';

interface HuntdAppProps extends AppProps {
  Component: AppProps['Component'] & {
    Layout?: FC
  }
}
const HuntdApp = ({ Component, pageProps }: HuntdAppProps) => {
  const { data, loading } = useAuthUserQuery({
    ssr: false,
  });

  const PageLayout = Component.Layout || SimpleLayout;
  const router = useRouter();

  const title = useMemo(
    () => {
      const path = router.asPath
        .split('?')[0]
        .split('/').pop() || 'Huntd';

      return path[0].toUpperCase() + path.substr(1);
    },
    [router.asPath],
  );

  useEffect(() => {
    if (loading) {
      return;
    }

    analytics.init(data?.authUser);
  }, [loading, data?.authUser]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ImpersonateLoginAlert />
      <PageLayout>
        <Component {...pageProps} />
        <AdminSettingsModule />
      </PageLayout>
      <FlashMessageWrapper />
    </>
  );
};

HuntdApp.getInitialProps = async (ctx: AppContextType<Router>) => ({
  ...await App.getInitialProps(ctx),
});

export default compose(
  withApolloApp,
  appWithTranslation,
)(HuntdApp);
