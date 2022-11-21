import { ApolloProvider } from '@apollo/client';
import React, { ComponentType } from 'react';
import { AppContext, AppProps } from 'next/app';
import { PageProps } from '@/controllers/page/page.typedefs';
import { initApollo } from '@/controllers/apollo/apollo.client';
import { setDisplayName } from '@/controllers/page/setDisplayName';

interface AppGetInitialProps {
  (ctx: AppContext): Promise<any>
}
interface WithApolloApp {
  (
    App: ComponentType<AppProps> & {getInitialProps?: AppGetInitialProps}
  ): ComponentType<AppProps>
}
export const withApolloApp: WithApolloApp = (App) => {
  const WithApolloApp = (props: AppProps<PageProps>) => {
    const { pageProps } = props;

    const client = pageProps.apolloClient ?? initApollo({
      initialState: pageProps.apolloState,
    });

    return (
      <ApolloProvider client={client}>
        <App {...props} />
      </ApolloProvider>
    );
  };

  if (App.getInitialProps) {
    WithApolloApp.getInitialProps = App.getInitialProps;
  }

  setDisplayName(App, WithApolloApp, 'withApolloApp');

  return WithApolloApp;
};
