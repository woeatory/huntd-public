import { useApolloClient } from '@apollo/client';
import { useLogOutFromUserMutation } from '@/controllers/graphql/generated';
import { Router } from '@/controllers/i18n/i18n.client';
import { Routes } from '@/controllers/router/router.constants';

export const useLogOutFromUser = () => {
  const client = useApolloClient();

  return useLogOutFromUserMutation({
    async update() {
      await client.resetStore();

      await Router.push(Routes.Home);
    },
  });
};
