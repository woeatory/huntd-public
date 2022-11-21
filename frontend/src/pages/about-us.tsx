import React from 'react';
import { NextSeo } from 'next-seo';
import { compose } from '@/lib/compose';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';
import { OurTeam } from '@/components/OurTeam';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';

const AboutUs = () => (
  <>
    <NextSeo
      title="About us"
    />
    <OurTeam />
  </>
);

export default compose(
  withLayout(DynamicLayout),
  withNoJoinCodePage,
)(AboutUs);
