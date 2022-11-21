import { FC } from 'react';
import { NextPage } from 'next';
import { PageProps } from '@/controllers/page/page.typedefs';

interface WithLayout{
  (Layout: FC): (
    PageComponent: NextPage<PageProps>
  ) => NextPage<PageProps>
}
export const withLayout: WithLayout = (Layout) => (PageComponent) => {
  Object.assign(PageComponent, { Layout });

  return PageComponent;
};
