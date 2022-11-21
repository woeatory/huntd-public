import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useRecruiterProfileBySlugQuery } from '@/controllers/graphql/generated';
import { compose } from '@/lib/compose';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { ProfileNamespaces } from '@/controllers/profile/profile.constants';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';
import { RecruiterPublicProfileModule } from '@/components/Profile/PublicProfile/RecruiterPublicProfileModule';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';

const CandidatePage = () => {
  const router = useRouter();

  const { loading, data } = useRecruiterProfileBySlugQuery({
    variables: {
      slug: router.query.slug as string,
    },
  });

  const { t } = useTranslation([Namespaces.Profile]);

  const profile = data?.recruiterProfileBySlug;

  const title = useMemo(() => {
    if (!profile) {
      return router.query.slug;
    }

    return t(`${Namespaces.Profile}:recruiter_profile_heading`, {
      position: profile.position,
      companyName: profile.companyName,
    });
  }, [router.query.slug, profile, t]);

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <RecruiterPublicProfileModule
        profile={profile}
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
