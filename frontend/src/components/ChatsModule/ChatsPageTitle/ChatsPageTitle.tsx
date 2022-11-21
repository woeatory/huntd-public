import React, { memo } from 'react';
import Head from 'next/head';
import { ComputedPageTitle } from '@/components/ChatsModule/ChatsPageTitle/ComputedPageTitle';

interface Props {
  profileConnectionId: number
}

export const ChatsPageTitle = memo<Props>(
  ({ profileConnectionId }) => {
    if (profileConnectionId > 0) {
      return (
        <ComputedPageTitle profileConnectionId={profileConnectionId} />
      );
    }

    return (
      <Head>
        <title>Chat</title>
      </Head>
    );
  },
);
