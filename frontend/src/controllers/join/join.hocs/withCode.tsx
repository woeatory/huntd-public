import React from 'react';
import { NextPage } from 'next';
import cookie from 'cookie';
import { GetInitialProps, PageProps } from '@/controllers/page/page.typedefs';
import { setDisplayName } from '@/controllers/page/setDisplayName';
import { redirectContext } from '@/controllers/router/router.utils/redirect.context';
import { Routes } from '@/controllers/router/router.constants';
import { AuthUserDocument, AuthUserQuery } from '@/controllers/graphql/generated';
import { getLoginRedirect } from '@/controllers/user/user.utils/getLoginRedirect';

export enum PrimeNum {
  base = '6961',
}

interface WithCode{
  (PageComponent: NextPage<PageProps>): NextPage<PageProps>
}
export const withCode: WithCode = (PageComponent) => {
  const WithCode = (pageProps: PageProps) => (
    <PageComponent {...pageProps} />
  );

  setDisplayName(PageComponent, WithCode, 'withCode');

  const getInitialProps: GetInitialProps = async (ctx) => {
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    if (!ctx.apolloClient) {
      throw new Error(`${withCode.name}: Apollo client is required to process authUser request`);
    }

    const queryResult = await ctx.apolloClient.query<AuthUserQuery>({
      query: AuthUserDocument,
    });

    const authUser = queryResult.data?.authUser;

    const cookies = cookie.parse(ctx.req?.headers.cookie ?? '');

    if (authUser) {
      const destination = getLoginRedirect(authUser);

      await redirectContext(ctx, destination);
    } else if (!cookies.join_code) {
      const code = (ctx.query.join_code ?? PrimeNum.base) as string;

      ctx.res?.setHeader('Set-Cookie', cookie.serialize('join_code', code, {
        maxAge: 259200,
      }));

      await redirectContext(ctx, Routes.Join);
    }

    return {
      ...pageProps,
    };
  };

  WithCode.getInitialProps = getInitialProps;

  return WithCode;
};
