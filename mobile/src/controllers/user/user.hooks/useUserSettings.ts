import { QueryResult } from '@apollo/client';
import {
  useUserSettingsQuery, UserSettingsQuery, UserSettings,
} from '@/controllers/graphql/generated';

interface UseUserSettings {
  (): [
    UserSettings | null,
    QueryResult<UserSettingsQuery>
  ]
}

export const useUserSettings: UseUserSettings = () => {
  const queryResult = useUserSettingsQuery();

  return [
    queryResult.data?.authUser?.settings ?? null,
    queryResult,
  ];
};
