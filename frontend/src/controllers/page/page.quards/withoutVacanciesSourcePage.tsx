import React from 'react';
import { NextPage } from 'next';
import { GetInitialProps, PageProps } from '@/controllers/page/page.typedefs';
import { setDisplayName } from '@/controllers/page/setDisplayName';
import {
  AuthUserDocument, AuthUserQuery,
} from '@/controllers/graphql/generated';
import { redirectContext } from '@/controllers/router/router.utils/redirect.context';
import { VacanciesRoutes } from '@/controllers/router/router.constants';

interface withoutVacanciesSourcePage{
  (PageComponent: NextPage<PageProps>): NextPage<PageProps>
}
export const withoutVacanciesSourcePage: withoutVacanciesSourcePage = (
  PageComponent,
) => {
  const WithoutVacanciesSource = () => (
    <PageComponent />
  );

  setDisplayName(PageComponent, WithoutVacanciesSource, 'withoutVacanciesSource');

  const getInitialProps: GetInitialProps = async (ctx) => {
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    if (!ctx.apolloClient) {
      throw new Error(`${withoutVacanciesSourcePage.name}: Apollo client is required to process authUser request`);
    }

    const queryResult = await ctx.apolloClient.query<AuthUserQuery>({
      query: AuthUserDocument,
    });

    const authUser = queryResult.data?.authUser;

    if (authUser?.hasVacanciesSource) {
      const destination = `${VacanciesRoutes.AtsSetupSuccess}`;

      await redirectContext(ctx, destination);
    }

    return {
      ...pageProps,
    };
  };

  WithoutVacanciesSource.getInitialProps = getInitialProps;

  return WithoutVacanciesSource;
};
