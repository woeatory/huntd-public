import React, { memo, useCallback } from 'react';
import { Flex, Padded } from '@buffetjs/core';
import { useApolloClient } from '@apollo/client';
import { CandidateProfilesBaseFragment } from '@/controllers/graphql/cms/cms.generated';
import { RejectProfileAction } from '@profile-checker/containers/ProfileReviewActions/RejectProfileAction';
import { ApproveProfileAction } from '@profile-checker/containers/ProfileReviewActions/ApproveProfileAction';
import { apiGraphqlRequestClient } from '@/controllers/graphql-request/api.graphql-request.client';
import { CandidateProfileStatus } from '@/controllers/graphql/api/api.request.generated';

interface Props {
  profile: CandidateProfilesBaseFragment
}
export const CandidateProfileActions = memo<Props>((props) => {
  const { profile } = props;

  const apolloClient = useApolloClient();

  const update = useCallback(
    (status: CandidateProfileStatus) => apolloClient.cache.modify({
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
        (client) => client.reviewCandidateProfile({
          id: Number(profile.id),
          status: CandidateProfileStatus.Active,
        }),
      );

      await update(data.reviewCandidateProfile.status);
    },
    [profile, update],
  );

  const rejectProfile = useCallback(async (rejectReason: string) => {
    const data = await apiGraphqlRequestClient().then(
      (client) => client.reviewCandidateProfile({
        id: Number(profile.id),
        status: CandidateProfileStatus.Rejected,
        rejectReason,
      }),
    );

    await update(data.reviewCandidateProfile.status);
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
