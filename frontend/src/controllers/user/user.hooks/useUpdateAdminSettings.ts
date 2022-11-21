import { useCallback } from 'react';
import { MutationResult } from '@apollo/client';
import {
  UpdateAdminSettingsMutation,
  UpdateAdminSettingsMutationVariables,
  useUpdateAdminSettingsMutation,
} from '@/controllers/graphql/generated';

type Options = UpdateAdminSettingsMutationVariables;

interface UseUpdateAdminSettings {
  (): [
    (options: Options) => Promise<void>,
    MutationResult<UpdateAdminSettingsMutation>,
  ]
}

export const useUpdateAdminSettings: UseUpdateAdminSettings = () => {
  const [mutate, query] = useUpdateAdminSettingsMutation();

  const callback = useCallback(async (options: Options) => {
    await mutate({
      variables: options,
    });
  }, [mutate]);

  return [callback, query];
};
