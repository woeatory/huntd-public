import { QueryResult } from '@apollo/client';
import {
  AuthUserQuery,
  useAuthUserQuery,
  User,
} from '@/controllers/graphql/generated';

interface UseAuthUser {
  (): [
    User | null,
    QueryResult<AuthUserQuery>
  ]
}
export const useAuthUser: UseAuthUser = () => {
  const queryResult = useAuthUserQuery();

  return [
    queryResult.data?.authUser ?? null,
    queryResult,
  ];
};
