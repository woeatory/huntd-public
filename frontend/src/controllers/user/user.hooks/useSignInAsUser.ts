import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSignInAsUserMutation } from '@/controllers/graphql/generated';
import { getLoginRedirect } from '@/controllers/user/user.utils/getLoginRedirect';
import { Router } from '@/controllers/i18n/i18n.client';

export const useSignInAsUser = () => {
  const client = useApolloClient();
  const { query } = useRouter();

  return useSignInAsUserMutation({
    async onCompleted(data) {
      await client.resetStore();
      if (data?.signInAsUser) {
        if (query.redirect) {
          await Router.push(query.redirect as string);

          return;
        }

        const destination = getLoginRedirect(data.signInAsUser);

        await Router.push(destination);
      }
    },
  });
};
