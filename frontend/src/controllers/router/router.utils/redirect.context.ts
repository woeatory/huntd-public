import { GetServerSidePropsContext } from 'next';
import { Router } from '@/controllers/i18n/i18n.client';
import { PageContext } from '@/controllers/page/page.typedefs';

interface RedirectContext {
  (
    context: PageContext | GetServerSidePropsContext,
    location: string
  ): Promise<void>
}
export const redirectContext: RedirectContext = async (
  context, location,
) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: location });
    context.res.end();
  } else {
    // browser
    await Router.replace(location);
  }
};
