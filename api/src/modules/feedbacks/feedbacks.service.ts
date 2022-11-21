import { QueueEventTypes } from '@/core/queue';
import { Service } from '@/core/Service';
import { User } from '@/models/User';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';
import { RecruiterProfileRepository } from '@/modules/recruiterProfile/recruiterProfile.repository';
import { PrimaryProfileEnum } from '../user/user.typedefs';
import { UserInfo, SendFeedbackToTrelloOptions, NO_PROFILE_SLUG } from './feedbacks.typedefs';

export class FeedbacksService extends Service {
  private readonly candidateRepository = this.makeRepository(
    CandidateProfileRepository,
  );

  private readonly recruiterRepository = this.makeRepository(
    RecruiterProfileRepository,
  );

  async sendFeedbackToTrello(
    options: SendFeedbackToTrelloOptions,
  ) {
    try {
      await this.gateways.queue.add(
        {
          type: QueueEventTypes.SendFeedbackToTrello,
          payload: options,
        },
      );
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getUserInfo(user: User): Promise<UserInfo> {
    const latestCandidateProfile = await this.candidateRepository
      .findLatestCandidateProfile({ userId: user.id });

    const latestRecruiterProfile = await this.recruiterRepository
      .findLatestRecruiterProfile({ userId: user.id });

    let slug = '';

    if (latestCandidateProfile) {
      slug = `${PrimaryProfileEnum.Candidate.toLowerCase()}/${latestCandidateProfile?.slug}`;
    } else if (latestRecruiterProfile) {
      slug = `${PrimaryProfileEnum.Recruiter.toLowerCase()}/${latestRecruiterProfile?.slug}`;
    }

    return {
      email: user.email,
      slug: slug.length ? slug : NO_PROFILE_SLUG,
    };
  }
}
