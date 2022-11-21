import { useCallback } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { SearchRoutes } from '@/controllers/router/router.constants';

interface Options {
  subscriptionUrl: string;
}

const withoutSystemParams = (url: string) => queryString.exclude(url,
  [SearchRoutes.CandidateLocation, SearchRoutes.SalaryMultiplier]);

export const useCompareSubscriptionUrl = () => {
  const router = useRouter();

  const compare = useCallback(({
    subscriptionUrl,
  }: Options) => (
    withoutSystemParams(router.asPath)
    === withoutSystemParams(subscriptionUrl)
  ), [router]);

  return compare;
};
