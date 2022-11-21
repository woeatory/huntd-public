import { QueryResult } from '@apollo/client';
import {
  useUsersOAuthProvidersQuery,
  OAuthToken,
  UsersOAuthProvidersQuery,
} from '@/controllers/graphql/generated';

interface UseUsersOAuthProviders {
  (): [
    OAuthToken[] | null,
    QueryResult<UsersOAuthProvidersQuery>
  ]
}
export const useUsersOAuthProviders: UseUsersOAuthProviders = () => {
  const queryResult = useUsersOAuthProvidersQuery();

  return [
    queryResult.data?.usersOAuthProviders ?? null,
    queryResult,
  ];
};
