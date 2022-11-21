import { useCallback } from 'react';
import {
  UpdateProfileContactsMutationVariables,
  UpdateProfileContactsMutationResult,
  useUpdateProfileContactsMutation,
  LatestCandidateProfileDocument, AuthUserDocument,
} from '@/controllers/graphql/generated';

type Options = UpdateProfileContactsMutationVariables

interface UseUpdateContacts {
  (): [
    (options: Options) => Promise<void>,
    UpdateProfileContactsMutationResult,
  ]
}

export const useUpdateContacts: UseUpdateContacts = () => {
  const [mutation, query] = useUpdateProfileContactsMutation();

  const updateContacts = useCallback(async (options) => {
    await mutation({
      variables: options,
      refetchQueries: [
        { query: LatestCandidateProfileDocument },
        { query: AuthUserDocument },
      ],
      awaitRefetchQueries: true,
    });
  }, [mutation]);

  return [updateContacts, query];
};
