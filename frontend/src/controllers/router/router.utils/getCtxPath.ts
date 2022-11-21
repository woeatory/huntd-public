import qs, { ParsedQuery } from 'query-string';
import { PageContext } from '@/controllers/page/page.typedefs';

export const getCtxPath = (ctx: PageContext) => {
  const { asPath, query } = ctx;

  return qs.stringifyUrl({
    url: asPath as string,
    query: query as ParsedQuery<string>,
  });
};
