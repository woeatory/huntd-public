import { QueryResult } from '@apollo/client';
import React, { memo, useEffect } from 'react';
import { ProfileActive } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileActive';
import { ProfileDraft } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileDraft';
import { ProfileInactive } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileInactive';
import { ProfileOnReview } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileOnReview';
import { ProfileRejected } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileRejected';
import { useSendCandidateProfileToReview } from '@/controllers/candidateProfile/candidateProfile.hooks/useSendCandidateProfileToReview';
import {
  CandidateProfileBaseFragment,
  CandidateProfileStatus,
  CandidateProfileStatusUpdatedDocument,
  CandidateProfileStatusUpdatedSubscription,
  LatestCandidateProfileQuery,
} from '@/controllers/graphql/generated';
import { ProfileRoutes } from '@/controllers/router/router.constants';
import { getFilledValue } from '@/lib/getFilledValue';
import { useDeactivateCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useDeactivateCandidateProfile';

interface Props {
  profile: CandidateProfileBaseFragment
  subscribeToProfileUpdates: QueryResult<LatestCandidateProfileQuery>['subscribeToMore']
}
export const CandidateProfilePreviewActions = memo<Props>(
  (props) => {
    const { profile, subscribeToProfileUpdates: subscribeToMore } = props;
    const profileType = 'candidate';

    const [mutate, { loading }] = useSendCandidateProfileToReview();
    const [
      deactivateProfile,
      { loading: isLoading },
    ] = useDeactivateCandidateProfile();

    useEffect(() => {
      const unsubscribe = subscribeToMore<
        CandidateProfileStatusUpdatedSubscription
      >({
        document: CandidateProfileStatusUpdatedDocument,
        updateQuery: (
          prev,
          { subscriptionData },
        ) => {
          const { Active } = CandidateProfileStatus;

          if (!subscriptionData || !prev.latestCandidateProfile) {
            return prev;
          }

          const { candidateProfileStatusUpdated } = subscriptionData.data;

          let updatedFields = {};

          if (
            candidateProfileStatusUpdated.id === prev.latestCandidateProfile.id
          ) {
            updatedFields = candidateProfileStatusUpdated;
          }

          if (
            candidateProfileStatusUpdated.status === Active
          ) {
            unsubscribe();
          }

          return {
            latestCandidateProfile: {
              ...prev.latestCandidateProfile,
              ...updatedFields,
            },
          };
        },
      });

      return () => unsubscribe();
    }, [subscribeToMore]);

    if (profile.status === CandidateProfileStatus.Draft) {
      return (
        <ProfileDraft
          callback={mutate}
          loading={loading}
          editProfileLink={ProfileRoutes.Candidate}
          profileType={profileType}
        />
      );
    }

    if (profile.status === CandidateProfileStatus.OnReview) {
      return (
        <ProfileOnReview
          editProfileLink={ProfileRoutes.Candidate}
        />
      );
    }

    if (profile.status === CandidateProfileStatus.Rejected) {
      return (
        <ProfileRejected
          editProfileLink={ProfileRoutes.Candidate}
          rejectReason={getFilledValue(profile.rejectReason)}
        />
      );
    }

    if (profile.status === CandidateProfileStatus.Active) {
      return (
        <ProfileActive
          editProfileLink={ProfileRoutes.Candidate}
          callback={deactivateProfile}
          loading={isLoading}
          profileType={profileType}
        />
      );
    }

    if (profile.status === CandidateProfileStatus.Inactive) {
      return (
        <ProfileInactive
          callback={mutate}
          loading={loading}
          editProfileLink={ProfileRoutes.Candidate}
          profileType={profileType}
        />
      );
    }

    return null;
  },
);
