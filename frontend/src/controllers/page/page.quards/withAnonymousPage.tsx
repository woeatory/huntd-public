import React from 'react';
import { NextPage } from 'next';
import { GetInitialProps, PageProps } from '@/controllers/page/page.typedefs';
import { setDisplayName } from '@/controllers/page/setDisplayName';
import {
  AuthUserDocument, AuthUserQuery,
} from '@/controllers/graphql/generated';
import { redirectContext } from '@/controllers/router/router.utils/redirect.context';
import { getLoginRedirect } from '@/controllers/user/user.utils/getLoginRedirect';

interface withAnonymousPage{
  (PageComponent: NextPage<PageProps>): NextPage<PageProps>
}
export const withAnonymousPage: withAnonymousPage = (PageComponent) => {
  const WithAnonymous = (pageProps: PageProps) => (
    <PageComponent {...pageProps} />
  );

  setDisplayName(PageComponent, WithAnonymous, 'withAnonymous');

  const getInitialProps: GetInitialProps = async (ctx) => {
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    if (!ctx.apolloClient) {
      throw new Error(`${withAnonymousPage.name}: Apollo client is required to process authUser request`);
    }

    const queryResult = await ctx.apolloClient.query<AuthUserQuery>({
      query: AuthUserDocument,
    });

    const authUser = queryResult.data?.authUser;

    if (authUser) {
      const destination = getLoginRedirect(authUser);

      await redirectContext(ctx, destination);
    }

    return {
      ...pageProps,
    };
  };

  WithAnonymous.getInitialProps = getInitialProps;

  return WithAnonymous;
};
