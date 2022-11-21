import { useCallback, useEffect } from 'react';
import {
  ProfileConnectionUpdatedDocument,
  ProfileConnectionUpdatedSubscription,
  useAuthUserConnectionsQuery,
} from '@/controllers/graphql/generated';

type UseChatParticipantsOptions = {
  archived?: boolean;
}

export const useChatParticipants = (options: UseChatParticipantsOptions) => {
  const { archived } = options;

  const {
    data,
    fetchMore: fetchMoreParticipants,
    loading,
    subscribeToMore,
    ...other
  } = useAuthUserConnectionsQuery({
    variables: { archived },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore<
      ProfileConnectionUpdatedSubscription
    >({
      document: ProfileConnectionUpdatedDocument,
      variables: { archived },
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData || !prev.authUser) {
          return prev;
        }

        const { profileConnectionUpdated } = subscriptionData.data;

        return {
          authUser: {
            ...prev.authUser,
            profileConnections: (prev.authUser.profileConnections || []).map(
              (profileConnection) => {
                if (profileConnection.id === profileConnectionUpdated.id) {
                  return {
                    ...profileConnection,
                    ...profileConnectionUpdated,
                  };
                }

                return profileConnection;
              },
            ),
          },
        };
      },
    });

    return () => unsubscribe();
  }, [archived]);

  const fetchMore = useCallback(async () => {
    if (!data || loading) {
      return;
    }

    await fetchMoreParticipants({
      variables: { archived },
    });
  }, [data, loading, fetchMoreParticipants, archived]);

  return {
    ...other, data, loading, fetchMore,
  };
};
