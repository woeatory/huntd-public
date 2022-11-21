import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useCandidateProfileBySlugQuery } from '@/controllers/graphql/generated';
import { CandidatePublicProfileModule } from '@/components/Profile/PublicProfile/CandidatePublicProfileModule';
import { compose } from '@/lib/compose';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { ProfileNamespaces } from '@/controllers/profile/profile.constants';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';

const CandidatePage = () => {
  const router = useRouter();

  const { loading, data } = useCandidateProfileBySlugQuery({
    variables: {
      slug: router.query.slug as string,
    },
  });

  const title = data?.candidateProfileBySlug?.position || router.query.slug;

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <CandidatePublicProfileModule
        profile={data?.candidateProfileBySlug}
        loading={loading}
      />
    </>
  );
};

export default compose(
  withLayout(DynamicLayout),
  withApolloSSR,
  withNamespaces(ProfileNamespaces),
)(CandidatePage);
