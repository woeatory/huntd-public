import React from 'react';
import { NextPage } from 'next';
import cookie from 'cookie';
import { GetInitialProps, PageProps } from '@/controllers/page/page.typedefs';
import { setDisplayName } from '@/controllers/page/setDisplayName';
import { redirectContext } from '@/controllers/router/router.utils/redirect.context';
import { Routes } from '@/controllers/router/router.constants';

interface withNoJoinCodePage{
  (PageComponent: NextPage<PageProps>): NextPage<PageProps>
}
export const withNoJoinCodePage: withNoJoinCodePage = (PageComponent) => {
  const WithNoJoinCode = (pageProps: PageProps) => (
    <PageComponent {...pageProps} />
  );

  setDisplayName(PageComponent, WithNoJoinCode, 'withNoJoinCode');

  const getInitialProps: GetInitialProps = async (ctx) => {
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    const cookies = cookie.parse(ctx.req?.headers.cookie ?? '');

    if (cookies.join_code) {
      await redirectContext(ctx, Routes.Join);
    }

    return {
      ...pageProps,
    };
  };

  WithNoJoinCode.getInitialProps = getInitialProps;

  return WithNoJoinCode;
};
