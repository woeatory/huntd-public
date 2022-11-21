import React from 'react';
import { NextPage } from 'next';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { UiKitPageContent } from '@/components/UiKitPageContent';
import { compose } from '@/lib/compose';

const UiKitPage: NextPage = () => (
  <UiKitPageContent />
);

export default compose(
  withNamespaces([]),
)(UiKitPage);
