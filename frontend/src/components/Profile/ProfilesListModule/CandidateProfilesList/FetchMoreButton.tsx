import React, { FC, useCallback, useState } from 'react';
import { Button } from '@/ui/buttons/Button';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { analytics } from '@/controllers/analytics/analytics.client';
import { PublicProfilesWhereClause } from '@/controllers/candidateProfile/candidateProfile.typedefs';
import { PublicProfilesOptions } from '@/controllers/graphql/generated';
import { CANDIDATE_PROFILES_BATCH_SIZE } from '@/components/Profile/profile.constants';

interface FetchMoreVariables {
  where: PublicProfilesWhereClause
  options: PublicProfilesOptions
}
interface Props {
  hasMore: boolean;
  offset: number;
  variables: FetchMoreVariables
  fetchMore: (props: any) => void;
}

export const FetchMoreButton: FC<Props> = (props) => {
  const [fetching, setFetching] = useState(false);
  const { t } = useTranslation([Namespaces.Common]);
  const {
    hasMore, variables,
    offset, fetchMore,
  } = props;

  const fetchMoreHandler = useCallback(
    async () => {
      analytics.sendEvent(
        analytics.events.pageInteraction.ShowMoreButtonClicked,
        {
          page: 'candidates',
        },
      );

      setFetching(true);
      await fetchMore({
        variables: {
          where: variables.where,
          options: {
            ...variables.options,
            offset,
          },
        },
      });
      setFetching(false);
    },
    [fetchMore, variables, offset],
  );

  return hasMore
    ? (
      <Button
        type='button'
        className='wide'
        mode={Button.mode.Secondary}
        disabled={!hasMore || fetching}
        onClick={fetchMoreHandler}
        text={t(`${Namespaces.Common}:fetch_more_button`, {
          count: CANDIDATE_PROFILES_BATCH_SIZE,
        })}
      />
    )
    : null;
};
