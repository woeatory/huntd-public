import {
  AuthUserConnectionsDocument, useUnarchiveProfileConnectionForUserMutation,
} from '@/controllers/graphql/generated';

export const useUnarchiveChat = () => (
  useUnarchiveProfileConnectionForUserMutation({
    refetchQueries: [
      {
        query: AuthUserConnectionsDocument,
        variables: {
          archived: false,
        },
      },
      {
        query: AuthUserConnectionsDocument,
        variables: {
          archived: true,
        },
      },
    ],
    awaitRefetchQueries: true,
  })
);
