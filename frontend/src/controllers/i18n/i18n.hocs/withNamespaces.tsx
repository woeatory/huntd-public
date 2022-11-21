import React from 'react';
import { NextPage } from 'next';
import { GetInitialProps, PageProps } from '@/controllers/page/page.typedefs';
import { setDisplayName } from '@/controllers/page/setDisplayName';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

interface WithNamespaces{
  // eslint-disable-next-line max-len
  (namespaces: Array<Namespaces>): (PageComponent: NextPage<PageProps>) => NextPage<PageProps>
}
export const withNamespaces: WithNamespaces = (
  namespaces,
) => (
  PageComponent,
) => {
  const WithNamespaces = (pageProps: PageProps) => (
    <PageComponent {...pageProps} />
  );

  setDisplayName(PageComponent, WithNamespaces, 'withNamespaces');

  const getInitialProps: GetInitialProps = async (ctx) => {
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    return {
      ...pageProps,
      namespacesRequired: namespaces,
    };
  };

  WithNamespaces.getInitialProps = getInitialProps;

  return WithNamespaces;
};
