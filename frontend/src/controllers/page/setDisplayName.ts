import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ComponentType } from 'react';
import { PageProps } from '@/controllers/page/page.typedefs';

interface WrappedPage {
  (pageProps: PageProps): JSX.Element
}
interface WrappedApp {
  (pageProps: AppProps<PageProps>): JSX.Element
}
interface SetDisplayName{
  (
    OriginalComponent: NextPage<PageProps> | ComponentType<AppProps>,
    WrappedComponent: WrappedPage | WrappedApp,
    prefix: string
  ): void
}
export const setDisplayName: SetDisplayName = (
  PageComponent, WrappedComponent, prefix,
) => {
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Page';

    Object.assign(WrappedComponent, {
      displayName: `${prefix}(${displayName})`,
    });
  }
};
