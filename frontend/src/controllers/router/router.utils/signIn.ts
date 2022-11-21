import qs from 'query-string';
import { Routes } from '@/controllers/router/router.constants';

export const signInRoute = (redirectUrl?: string): string => (
  redirectUrl
    ? `${Routes.SignIn}?${qs.stringify({
      redirectUrl: encodeURIComponent(redirectUrl),
    })}`
    : Routes.SignIn
);
