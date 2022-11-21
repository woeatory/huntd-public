import React, { memo, useCallback } from 'react';
import { Flex, Padded } from '@buffetjs/core';
import { useApolloClient } from '@apollo/client';
import {
  RecruiterProfilesBaseFragment,
} from '@/controllers/graphql/cms/cms.generated';
import { ApproveProfileAction } from '@profile-checker/containers/ProfileReviewActions/ApproveProfileAction';
import { RejectProfileAction } from '@profile-checker/containers/ProfileReviewActions/RejectProfileAction';
import { RecruiterProfileStatus } from '@/controllers/graphql/api/api.request.generated';
import { apiGraphqlRequestClient } from '@/controllers/graphql-request/api.graphql-request.client';

interface Props {
  profile: RecruiterProfilesBaseFragment
}
export const RecruiterProfileActions = memo<Props>((props) => {
  const { profile } = props;

  const apolloClient = useApolloClient();

  const update = useCallback(
    (status: RecruiterProfileStatus) => apolloClient.cache.modify({
      id: apolloClient.cache.identify(profile),
      fields: {
        status() {
          return status;
        },
      },
    }),
    [profile, apolloClient],
  );

  const approveProfile = useCallback(
    async () => {
      const data = await apiGraphqlRequestClient().then(
        (client) => client.reviewRecruiterProfile({
          id: Number(profile.id),
          status: RecruiterProfileStatus.Active,
        }),
      );

      await update(data.reviewRecruiterProfile.status);
    },
    [profile, update],
  );

  const rejectProfile = useCallback(async (rejectReason: string) => {
    const data = await apiGraphqlRequestClient().then(
      (client) => client.reviewRecruiterProfile({
        id: Number(profile.id),
        status: RecruiterProfileStatus.Rejected,
        rejectReason,
      }),
    );

    await update(data.reviewRecruiterProfile.status);
  }, [profile, update]);

  return (
    <Flex>
      <Padded right size="sm">
        <RejectProfileAction callback={rejectProfile} />
      </Padded>

      <ApproveProfileAction callback={approveProfile} />
    </Flex>
  );
});
