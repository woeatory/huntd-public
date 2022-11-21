import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSalariesDataByCategoryQuery, useVacanciesQuery } from '@/controllers/graphql/generated';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';
import { Vacancies } from '@/components/Vacancies';
import { VACANCIES_SALARIES_CATEGORIES } from '@/components/Vacancies/vacancies.constants';
import { WrongVacanciesCategory } from '@/components/Vacancies/WrongVacanciesCategory/WrongVacanciesCategory';
import { AverageSalaryInfo } from '@/components/Vacancies/AverageSalaryInfo/AverageSalaryInfo';
import { EmptySalaryInfo } from '@/components/Vacancies/EmptySalaryInfo/EmptySalaryInfo';
import { analytics } from '@/controllers/analytics/analytics.client';

const Web3Salaries = () => {
  const { query } = useRouter();
  const category = query.category as string;

  const salariesData = useSalariesDataByCategoryQuery({
    variables: {
      keywords: category
        ? category.split('-')
        : [],
    },
  });

  const { data, loading, fetchMore } = useVacanciesQuery({
    variables: {
      options: {
        keywords: category
          ? category.split('-')
          : [],
      },
    },
  });

  const vacancies = useMemo(() => data?.vacancies?.rows ?? [], [data]);

  const salaryData = useMemo(() => (salariesData.data?.salariesDataByCategory
    ? salariesData.data.salariesDataByCategory
    : {
      averageMinSalary: 50000,
      averageSalary: 75000,
      maxSalary: 100000,
    }), [salariesData]);

  const hasMore = data?.vacancies.hasMore ?? false;

  const isWrongCategory = category
    && !VACANCIES_SALARIES_CATEGORIES.has(category);

  const isNoSalaryInfo = !category || !salaryData
    || Object.values(salaryData).some((number) => !number);

  useEffect(() => {
    if (category && !isWrongCategory) {
      analytics.sendEvent(
        analytics.events.pageInteraction.VisitSalariesPage,
        {
          tech: category,
        },
      );
    }
  }, [category, isWrongCategory]);

  if (isWrongCategory) {
    return <WrongVacanciesCategory />;
  }

  if (!loading && isNoSalaryInfo) {
    return <EmptySalaryInfo />;
  }

  return (
    <>
      <AverageSalaryInfo
        category={category}
        salaryData={salaryData}
      />
      <Vacancies
        hasMore={hasMore}
        vacancies={vacancies}
        loading={loading}
        fetchMore={fetchMore}
        isSalariesPage
      />
    </>
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
)(Web3Salaries);
