import { AppEnvironments, ValidationRules } from '@mate-academy/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { AuthUseCase } from '@/core';
import {
  CandidateAwaitingProfileReview,
  CandidateProfileApproved,
} from '@/modules/candidateProfile/candidateProfile.notificationTypes';
import { getHostUrl } from '@/helpers/getHostUrl';
import { telegramCommunityLink } from '@/constants/links';
import { CandidateProfileService } from '@/modules/candidateProfile/candidateProfile.service';
import { CandidateProfileStatusEnum } from '@/modules/candidateProfile/candidateProfile.typedefs';

export type SendCandidateProfileToReviewUseCaseOptions = unknown;
export type SendCandidateProfileToReviewUseCaseResult = CandidateProfile;

type Options = SendCandidateProfileToReviewUseCaseOptions;
type Result = SendCandidateProfileToReviewUseCaseResult;

export class SendCandidateProfileToReviewUseCase extends AuthUseCase<
  Options, Result
> {
  private readonly candidateProfileService = this.makeService(
    CandidateProfileService,
  )

  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    const profile = await this.candidateProfileService.sendProfileToReview({
      userId: this.authUser.id,
      firstName: this.authUser.firstName,
      lastName: this.authUser.lastName,
    });

    if (profile.status === CandidateProfileStatusEnum.Active) {
      this.gateways.notifications.notify<CandidateProfileApproved>({
        user_id: profile.userId,
        notification_uid: `candidate_profile_approved|${Date.now()}`,
        channel: this.gateways.notifications.channels.Email,
        notification_type: 'CANDIDATE_PROFILE_APPROVED',
        message_data: {
          subject: `${this.authUser.firstName}, your profile is approved!`,
          destination: this.authUser.email,
          profile_link: `${getHostUrl()}/profile-preview/candidate`,
          first_name: `${this.authUser.firstName}`,
          community_link: telegramCommunityLink,
        },
      });

      this.gateways.analytics.sendEvent({
        event: this.gateways.analytics.events.candidateProfile
          .CandidateProfileReviewed,
        userEmail: this.authUser.email,
        data: {
          slug: profile.slug,
          salary: profile.salary,
          specialization: profile.specialization?.name,
          englishLevel: profile.englishLevel?.slug,
          status: CandidateProfileStatusEnum.Active,
        },
      });
    }

    if (profile.status === CandidateProfileStatusEnum.OnReview) {
      const slackChannel = process.env.APP_ENV === AppEnvironments.Production
        ? 'huntd_profiles'
        : 'huntd_profiles_development';

      this.gateways.notifications.notify<CandidateAwaitingProfileReview>({
        user_id: this.authUser.id,
        notification_uid: `candidate_awaiting_profile_review|${Date.now()}`,
        channel: this.gateways.notifications.channels.Slack,
        notification_type: 'AWAITING_PROFILE_REVIEW',
        message_data: {
          subject: this.authUser.computedName,
          destination: slackChannel,
          icon: ':huntd-icon:',
          profile_type: 'candidate',
          user_name: this.authUser.computedName,
          email: this.authUser.email,
          admin_link: `${getHostUrl()}/admin/plugins/profile-checker/candidates`,
          impersonate_login_link: `${getHostUrl()}/sign-in-as-user?email=${this.authUser.email}`,
        },
      });
    }

    return profile;
  }
}
