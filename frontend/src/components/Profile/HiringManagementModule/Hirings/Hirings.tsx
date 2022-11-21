import React, { FC, useMemo } from 'react';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { useAuthUserHiresQuery } from '@/controllers/graphql/generated';
import { HiringsList } from './HiringsList/HiringsList';
import { EmptyList } from '../EmptyList/EmptyList';

export const Hirings: FC = () => {
  const { data, loading: connectionsLoading } = useAuthUserHiresQuery();

  const { t } = useTranslation([Namespaces.Profile]);

  const hires = useMemo(() => data?.authUser?.hires ?? [], [data]);

  return (
    <div className="grid-container mt-40">
      <div className="grid-x grid-margin-x">
        {hires.length
          ? (
            <HiringsList
              hires={hires}
              loading={connectionsLoading}
            />
          )
          : (
            <EmptyList
              heading={t(`${Namespaces.Profile}:no_hirings_title`)}
              subheading={t(`${Namespaces.Profile}:no_hirings_subtitle`)}
            />
          )}
      </div>
    </div>
  );
};
