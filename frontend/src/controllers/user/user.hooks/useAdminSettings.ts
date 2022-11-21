import { QueryResult } from '@apollo/client';
import {
  AdminSettingsQuery, AdminSettings, useAdminSettingsQuery,
} from '@/controllers/graphql/generated';

interface UseAdminSettings {
  (): [
    AdminSettings | null,
    QueryResult<AdminSettingsQuery>
  ]
}

export const useAdminSettings: UseAdminSettings = () => {
  const queryResult = useAdminSettingsQuery();

  return [
    queryResult.data?.authUser?.adminSettings ?? null,
    queryResult,
  ];
};
