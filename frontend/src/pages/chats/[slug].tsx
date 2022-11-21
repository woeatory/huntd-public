import React from 'react';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { ChatsModule } from '@/components/ChatsModule';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { ChatLayout } from '@/components/Base/Layout/ChatLayout';

const Chats = () => (
  <ChatsModule />
);

export default compose(
  withLayout(ChatLayout),
  withApolloSSR,
  withNamespaces([
    Namespaces.Common,
    Namespaces.Profile,
    Namespaces.Chat,
  ]),
  withAuthUserPage(),
)(Chats);
