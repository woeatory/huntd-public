import { NextPage } from 'next';
import React from 'react';
import { GetInitialProps, PageProps } from '@/controllers/page/page.typedefs';
import { initApolloInContext } from '@/controllers/apollo/apollo.client';
import { setDisplayName } from '@/controllers/page/setDisplayName';

interface WithApolloSSR {
  (PageComponent: NextPage<PageProps>): NextPage<PageProps>
}
export const withApolloSSR: WithApolloSSR = (PageComponent) => {
  const WithApolloSSR = (pageProps: PageProps) => (
    <PageComponent {...pageProps} />
  );

  setDisplayName(PageComponent, WithApolloSSR, 'withApolloSSRs');

  const getInitialProps: GetInitialProps = async (ctx) => {
    const headers = ctx.req?.headers ?? {};

    const client = initApolloInContext({ ctx, headers });

    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    if (typeof window === 'undefined') {
      const { AppTree } = ctx;

      if (ctx.res?.finished || ctx.res?.headersSent) {
        return pageProps;
      }

      if (AppTree) {
        try {
          const { getDataFromTree } = await import('@apollo/client/react/ssr');

          await getDataFromTree(
            <AppTree
              pageProps={{ ...pageProps, apolloClient: client }}
            />,
          );
        } catch (error) {
          // TODO: Add logger
          // eslint-disable-next-line no-console
          console.error('Error while running `getDataFromTree`', error);
        }
      }
    }

    return {
      ...pageProps,
      apolloState: client.cache.extract(),
      apolloClient: client,
    };
  };

  WithApolloSSR.getInitialProps = getInitialProps;

  return WithApolloSSR;
};
