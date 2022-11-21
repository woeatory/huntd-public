import {
  AuthUserConnectionsDocument, useArchiveProfileConnectionForUserMutation,
} from '@/controllers/graphql/generated';

export const useArchiveChat = () => useArchiveProfileConnectionForUserMutation({
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
});
