import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useVacanciesByCompanyQuery } from '@/controllers/graphql/generated';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';
import { Vacancies } from '@/components/Vacancies';
import { WrongVacanciesCategory } from '@/components/Vacancies/WrongVacanciesCategory/WrongVacanciesCategory';
import { COMPANIES } from '@/components/Web3Companies/constants';

const CompanyVacancies = () => {
  const { query } = useRouter();
  const companyQuery = query.company as string;
  const companyName = companyQuery.split('-').join(' ');

  const { data, loading } = useVacanciesByCompanyQuery({
    variables: {
      options: {
        companyName,
      },
    },
  });

  const vacancies = useMemo(() => data?.vacanciesByCompany ?? [], [data]);

  if (companyName && !COMPANIES.find((company) => (
    companyName === company.companyName.toLowerCase()
  ))) {
    return <WrongVacanciesCategory />;
  }

  return (
    <Vacancies
      vacancies={vacancies}
      loading={loading}
      companyName={companyName}
    />
  );
};

export default compose(
  withLayout(DynamicLayout),
  withNamespaces([
    Namespaces.Vacancy,
    Namespaces.Common,
    Namespaces.Form,
    Namespaces.Profile,
    Namespaces.Auth,
    Namespaces.Ats,
  ]),
  withNoJoinCodePage,
)(CompanyVacancies);
