import { useCallback } from 'react';
import { MutationResult } from '@apollo/client';
import {
  UpdateUserSettingsMutation,
  UpdateUserSettingsMutationVariables,
  useUpdateUserSettingsMutation,
} from '@/controllers/graphql/generated';

type Options = UpdateUserSettingsMutationVariables;

interface UseUpdateUserSettings {
  (): [
    (options: Options) => Promise<void>,
    MutationResult<UpdateUserSettingsMutation>,
  ]
}

export const useUpdateUserSettings: UseUpdateUserSettings = () => {
  const [mutate, query] = useUpdateUserSettingsMutation();

  const callback = useCallback(async (options: Options) => {
    await mutate({
      variables: options,
    });
  }, [mutate]);

  return [callback, query];
};
