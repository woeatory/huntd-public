import { useResetPasswordMutation } from '@/controllers/graphql/generated';
import { Router } from '@/controllers/i18n/i18n.client';
import { Routes } from '@/controllers/router/router.constants';

export const useResetPassword = () => useResetPasswordMutation({
  async update() {
    await Router.replace(Routes.SignIn);
  },
});
