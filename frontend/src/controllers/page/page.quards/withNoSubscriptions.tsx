import React from 'react';
import { NextPage } from 'next';
import { GetInitialProps, PageProps } from '@/controllers/page/page.typedefs';
import { setDisplayName } from '@/controllers/page/setDisplayName';
import {
  AuthUserDocument,
  AuthUserQuery,
  UserSubscriptionsDocument, UserSubscriptionsQuery,
} from '@/controllers/graphql/generated';
import { redirectContext } from '@/controllers/router/router.utils/redirect.context';
import { HiringManagementRoutes } from '@/controllers/router/router.constants';

interface WithNoSubscriptionsPage {
  (
    options?: { redirectUrl?: string }
  ): (PageComponent: NextPage<PageProps>) => NextPage<PageProps>
}
export const withNoSubscriptionsPage: WithNoSubscriptionsPage = (
  options = {},
) => (
  PageComponent,
) => {
  const WithNoSubscriptions = (pageProps: PageProps) => (
    <PageComponent {...pageProps} />
  );

  setDisplayName(PageComponent, WithNoSubscriptions, 'withNoSubscriptions');

  const getInitialProps: GetInitialProps = async (ctx) => {
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    if (!ctx.apolloClient) {
      throw new Error(`${withNoSubscriptionsPage.name}: Apollo client is required to process authUser request`);
    }

    const queryResult = await ctx.apolloClient.query<UserSubscriptionsQuery>({
      query: UserSubscriptionsDocument,
    });

    const authQueryResult = await ctx.apolloClient.query<AuthUserQuery>({
      query: AuthUserDocument,
    });

    if (queryResult?.data?.authUser?.searchSubscriptions?.length
    && !authQueryResult.data.authUser?.isAdminUser) {
      await redirectContext(
        ctx, options.redirectUrl ?? HiringManagementRoutes.Subscriptions,
      );
    }

    return {
      ...pageProps,
    };
  };

  WithNoSubscriptions.getInitialProps = getInitialProps;

  return WithNoSubscriptions;
};
