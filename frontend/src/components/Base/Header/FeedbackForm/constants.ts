import { Routes } from '@/controllers/router/router.constants';

export const getFeedbackTitle = (route: string) => {
  const result = route.replace(/[^a-zA-z]/gi, ' ').trim().toUpperCase();

  return result.length ? result : Routes.Home;
};
