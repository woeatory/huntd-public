import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useVacanciesQuery } from '@/controllers/graphql/generated';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';
import { Vacancies } from '@/components/Vacancies';
import { VACANCIES_CATEGORIES } from '@/components/Vacancies/vacancies.constants';
import { WrongVacanciesCategory } from '@/components/Vacancies/WrongVacanciesCategory/WrongVacanciesCategory';
import { usePreviousValue } from '@/controllers/form/form.hooks/usePreviousValue';

const JobsByCategory = () => {
  const { query, reload, pathname } = useRouter();
  const category = query.category as string;

  const where = {
    options: {
      keywords: category
        ? category.split('-')
        : [],
    },
  };

  const { data, loading, fetchMore } = useVacanciesQuery({
    variables: {
      ...where,
    },
  });

  const vacancies = useMemo(() => data?.vacancies.rows ?? [], [data]);
  const hasMore = data?.vacancies.hasMore ?? false;

  const currentCategory = category || pathname;
  const previousCategory = usePreviousValue(currentCategory);

  const shouldReload = useMemo(() => previousCategory !== currentCategory,
    [currentCategory, previousCategory]);

  useEffect(() => {
    if (!shouldReload || !previousCategory) {
      return;
    }

    reload();
  }, [reload, previousCategory, shouldReload]);

  if (category && !VACANCIES_CATEGORIES.has(category)) {
    return <WrongVacanciesCategory />;
  }

  return (
    <>
      <Vacancies
        vacancies={vacancies}
        loading={loading}
        fetchMore={fetchMore}
        hasMore={hasMore}
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
)(JobsByCategory);
