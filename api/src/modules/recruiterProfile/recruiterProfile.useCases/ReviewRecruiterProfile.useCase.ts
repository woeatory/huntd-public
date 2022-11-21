import { ValidationRules } from '@mate-academy/core';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { ServiceUseCase } from '@/core';
import {
  RecruiterProfileApproved,
  RecruiterProfileRejected,
} from '@/modules/recruiterProfile/recruiterProfile.notificationTypes';
import { getHostUrl } from '@/helpers/getHostUrl';
import { RecruiterProfileRepository } from '@/modules/recruiterProfile/recruiterProfile.repository';

export interface ReviewRecruiterProfileUseCaseOptions {
  id: number;
  status: RecruiterProfileStatusEnum;
  rejectReason?: string;
}
export type ReviewRecruiterProfileUseCaseResult = RecruiterProfile;

type Options = ReviewRecruiterProfileUseCaseOptions;
type Result = ReviewRecruiterProfileUseCaseResult;

export class ReviewRecruiterProfileUseCase extends ServiceUseCase<
  Options, Result
  > {
  private readonly recruiterProfileRepository = this.makeRepository(
    RecruiterProfileRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
      status: ['required', { one_of: Object.values(RecruiterProfileStatusEnum) }],
      rejectReason: ['string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const profile = await this.recruiterProfileRepository
      .reviewRecruiterProfile({
        userId: options.id,
        status: options.status,
        rejectReason: options.rejectReason,
      });

    if (profile.status === RecruiterProfileStatusEnum.Active) {
      this.gateways.notifications.notify<RecruiterProfileApproved>({
        user_id: profile.userId,
        notification_uid: `recruiter_profile_approved|${Date.now()}`,
        channel: this.gateways.notifications.channels.Email,
        notification_type: 'PROFILE_APPROVED',
        message_data: {
          subject: `Your recruiter's profile approved!`,
          destination: profile.user.email,
          type: 'recruiter',
          profile_link: `${getHostUrl()}/profile-preview/recruiter`,
        },
      });
    }

    if (profile.status === RecruiterProfileStatusEnum.Rejected) {
      this.gateways.notifications.notify<RecruiterProfileRejected>({
        user_id: profile.userId,
        notification_uid: `recruiter_profile_rejected|${Date.now()}`,
        channel: this.gateways.notifications.channels.Email,
        notification_type: 'PROFILE_REJECTED',
        message_data: {
          subject: `Your recruiter's profile needs some changes!`,
          destination: profile.user.email,
          type: 'recruiter',
          reject_reason: profile.rejectReason || '',
          profile_link: `${getHostUrl()}/profile-preview/recruiter`,
        },
      });
    }

    return profile;
  }
}
