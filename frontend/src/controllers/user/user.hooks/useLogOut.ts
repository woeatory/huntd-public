import { useApolloClient } from '@apollo/client';
import { useLogOutMutation } from '@/controllers/graphql/generated';
import { Router } from '@/controllers/i18n/i18n.client';
import { Routes } from '@/controllers/router/router.constants';

export const useLogOut = () => {
  const client = useApolloClient();

  return useLogOutMutation({
    async update() {
      await client.clearStore();

      await Router.push(Routes.SignIn);
    },
  });
};
