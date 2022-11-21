import { ClientError } from '@mate-academy/core';
import { Service } from '@/core/Service';
import { RecruiterProfileRepository } from '@/modules/recruiterProfile/recruiterProfile.repository';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import {
  RECRUITER_PROFILE_CONTACTS_NOT_FILLED,
  RECRUITER_PROFILE_INVALID_STATUS,
} from '@/modules/recruiterProfile/recruiterProfile.constants';

interface SendMessageOptions {
  subscriptionId: number;
  message: string;
}

export class RecruiterProfileService extends Service {
  private readonly recruiterProfileRepository = this.makeRepository(
    RecruiterProfileRepository,
  )

  async activateRecruiterProfile(options: {
    userId: number,
    firstName: string,
    lastName: string,
  }) {
    const profile = await this.recruiterProfileRepository
      .getLatestRecruiterProfile({ userId: options.userId });

    if (
      ![RecruiterProfileStatusEnum.Draft, RecruiterProfileStatusEnum.Inactive]
        .includes(profile.status)
    ) {
      throw new ClientError({
        message: RECRUITER_PROFILE_INVALID_STATUS,
      });
    }

    if (!options.firstName && !options.lastName) {
      throw new ClientError({
        message: RECRUITER_PROFILE_CONTACTS_NOT_FILLED,
      });
    }

    await this.recruiterProfileRepository.deactivateAllActiveRecruiterProfiles({
      userId: options.userId,
    });

    return this.recruiterProfileRepository.updateProfile(profile.id, {
      status: RecruiterProfileStatusEnum.Active,
    });
  }
}
