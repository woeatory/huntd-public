import React, { memo, useEffect } from 'react';
import { QueryResult } from '@apollo/client';
import {
  RecruiterProfile,
  RecruiterProfileStatus,
  RecruiterProfileStatusUpdatedDocument,
  RecruiterProfileStatusUpdatedSubscription,
  LatestRecruiterProfileQuery,
} from '@/controllers/graphql/generated';
import { ProfileDraft } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileDraft';
import { RecruiterProfileRoutes } from '@/controllers/router/router.constants';
import { ProfileOnReview } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileOnReview';
import { ProfileRejected } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileRejected';
import { getFilledValue } from '@/lib/getFilledValue';
import { ProfileActive } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileActive';
import { ProfileInactive } from '@/components/Profile/ProfilePreview/ProfileActions/ProfileInactive';
import { useSendRecruiterProfileToReview } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useSendRecruiterProfileToReview';
import { useDeactivateRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useDeactivateRecruiterProfile';

interface Props {
  profile: RecruiterProfile
  subscribeToRecruiterUpdates: QueryResult<LatestRecruiterProfileQuery>['subscribeToMore']
}
export const RecruiterProfilePreviewActions = memo<Props>(
  (props) => {
    const { profile, subscribeToRecruiterUpdates: subscribeToMore } = props;
    const profileType = 'recruiter';

    const [mutate, { loading }] = useSendRecruiterProfileToReview();
    const [
      deactivateProfile,
      { loading: isLoading },
    ] = useDeactivateRecruiterProfile();

    useEffect(() => {
      const unsubscribe = subscribeToMore<
        RecruiterProfileStatusUpdatedSubscription
        >({
          document: RecruiterProfileStatusUpdatedDocument,
          updateQuery: (
            prev,
            { subscriptionData },
          ) => {
            const { Active } = RecruiterProfileStatus;

            if (!subscriptionData || !prev.latestRecruiterProfile) {
              return prev;
            }

            const { recruiterProfileStatusUpdated } = subscriptionData.data;

            let updatedFields = {};

            if (
              recruiterProfileStatusUpdated.id
              === prev.latestRecruiterProfile.id
            ) {
              updatedFields = recruiterProfileStatusUpdated;
            }

            if (
              recruiterProfileStatusUpdated.status === Active
            ) {
              unsubscribe();
            }

            return {
              latestRecruiterProfile: {
                ...prev.latestRecruiterProfile,
                ...updatedFields,
              },
            };
          },
        });

      return () => unsubscribe();
    }, [subscribeToMore]);

    if (profile.status === RecruiterProfileStatus.Draft) {
      return (
        <ProfileDraft
          callback={mutate}
          loading={loading}
          editProfileLink={RecruiterProfileRoutes.CompanyInfo}
          profileType={profileType}
        />
      );
    }

    if (profile.status === RecruiterProfileStatus.OnReview) {
      return (
        <ProfileOnReview
          editProfileLink={RecruiterProfileRoutes.CompanyInfo}
        />
      );
    }

    if (profile.status === RecruiterProfileStatus.Rejected) {
      return (
        <ProfileRejected
          editProfileLink={RecruiterProfileRoutes.CompanyInfo}
          rejectReason={getFilledValue(profile.rejectReason)}
        />
      );
    }

    if (profile.status === RecruiterProfileStatus.Active) {
      return (
        <ProfileActive
          editProfileLink={RecruiterProfileRoutes.CompanyInfo}
          callback={deactivateProfile}
          loading={isLoading}
          profileType={profileType}
        />
      );
    }

    if (profile.status === RecruiterProfileStatus.Inactive) {
      return (
        <ProfileInactive
          callback={mutate}
          loading={loading}
          editProfileLink={RecruiterProfileRoutes.CompanyInfo}
          profileType={profileType}
        />
      );
    }

    return null;
  },
);
