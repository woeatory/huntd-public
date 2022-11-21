import {
  AuthUserConnectionsDocument,
  useDeleteProfileConnectionForUserMutation,
} from '@/controllers/graphql/generated';

export const useDeleteChat = () => useDeleteProfileConnectionForUserMutation({
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
