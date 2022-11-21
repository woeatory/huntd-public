import React from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { ProfileLayout } from '@/components/Base/Layout/ProfileLayout';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { Routes } from '@/controllers/router/router.constants';
import { VacancySourceType } from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { ATSSetupModule } from '@/components/Vacancies/ATSSetupModule';

const ATSModule = () => {
  const { query } = useRouter();

  const ats = query.ats as string;

  const legitATSs = Object.values(VacancySourceType)
    .map((item) => item.toLowerCase());

  if (ats && !legitATSs.includes(ats)) {
    return <Error statusCode={404} />;
  }

  return (
    <ATSSetupModule atsType={ats.toUpperCase() as VacancySourceType} />
  );
};

export default compose(
  withLayout(ProfileLayout),
  withApolloSSR,
  withNamespaces([Namespaces.Ats, Namespaces.Validations]),
  withAuthUserPage({ redirectUrl: `${Routes.Vacancies}` }),
)(ATSModule);
