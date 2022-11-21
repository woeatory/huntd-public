import React, { memo, useMemo } from 'react';
import Head from 'next/head';
import { useProfileConnectionMetaQuery } from '@/controllers/graphql/generated';
import { getChatBuddyMeta } from '@/controllers/buddyChat/buddyChat.utils/getChatBuddyMeta';

interface Props {
  profileConnectionId: number;
}
export const ComputedPageTitle = memo<Props>(
  ({ profileConnectionId }) => {
    const { data, loading } = useProfileConnectionMetaQuery({
      variables: {
        profileConnectionId,
      },
      ssr: true,
    });

    const chatTitle = useMemo(() => {
      if (loading) {
        return 'Chat loading';
      }

      if (!data?.profileConnection) {
        return `Chat`;
      }

      const chatBuddyMeta = getChatBuddyMeta(data.profileConnection);

      if (chatBuddyMeta.user) {
        return `${chatBuddyMeta.user.computedName} (${chatBuddyMeta.profile.position}) - Chat`;
      }

      return `${chatBuddyMeta.profile.position} - Chat`;
    }, [data?.profileConnection, loading]);

    const pageTitle = useMemo(() => {
      if (Number(data?.profileConnection?.unreadMessagesCount) > 0) {
        return `(${data?.profileConnection?.unreadMessagesCount}) ${chatTitle}`;
      }

      return chatTitle;
    }, [data?.profileConnection, chatTitle]);

    return (
      <Head>

        <title>
          {pageTitle}
        </title>
      </Head>
    );
  },
);
