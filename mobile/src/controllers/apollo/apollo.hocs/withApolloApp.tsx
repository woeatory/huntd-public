import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { initApolloClient } from '@/controllers/apollo/apollo.client';

type Props = Record<string, unknown>;

export const withApolloApp = (
  Component: FC,
) => (props: Props) => {
  const client = initApolloClient();

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};
