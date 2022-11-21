import React from 'react';
import { NextPage } from 'next';
import { GetInitialProps, PageProps } from '@/controllers/page/page.typedefs';
import { setDisplayName } from '@/controllers/page/setDisplayName';
import {
  AuthUserDocument, AuthUserQuery,
} from '@/controllers/graphql/generated';
import { redirectContext } from '@/controllers/router/router.utils/redirect.context';
import { signInRoute } from '@/controllers/router/router.utils/signIn';
import { getCtxPath } from '@/controllers/router/router.utils/getCtxPath';

interface WithAuthUserPage{
  (
    options?: { redirectUrl?: string }
  ): (PageComponent: NextPage<PageProps>) => NextPage<PageProps>
}
export const withAuthUserPage: WithAuthUserPage = (
  options = {},
) => (
  PageComponent,
) => {
  const WithAuthUser = (pageProps: PageProps) => (
    <PageComponent {...pageProps} />
  );

  setDisplayName(PageComponent, WithAuthUser, 'withAuthUser');

  const getInitialProps: GetInitialProps = async (ctx) => {
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    if (!ctx.apolloClient) {
      throw new Error(`${withAuthUserPage.name}: Apollo client is required to process authUser request`);
    }

    const queryResult = await ctx.apolloClient.query<AuthUserQuery>({
      query: AuthUserDocument,
    });

    if (!queryResult.data?.authUser) {
      await redirectContext(ctx, signInRoute(
        options.redirectUrl || getCtxPath(ctx),
      ));
    }

    return {
      ...pageProps,
    };
  };

  WithAuthUser.getInitialProps = getInitialProps;

  return WithAuthUser;
};
