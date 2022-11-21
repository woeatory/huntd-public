import React from 'react';
import { useRouter } from 'next/router';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { EmptyLayout } from '@/components/Base/Layout/EmptyLayout';
import { withAnonymousPage } from '@/controllers/page/page.quards/withAnonymousPage';
import { InviteModule } from '@/components/Invite/Invite';
import { withCode } from '@/controllers/join/join.hocs/withCode';

const InvitePage = () => {
  const { query } = useRouter();

  const code = query.code as string;

  return (
    <InviteModule code={code} />
  );
};

export default compose(
  withLayout(EmptyLayout),
  withCode,
  withNamespaces([Namespaces.Join]),
  withApolloSSR,
  withAnonymousPage,
)(InvitePage);
