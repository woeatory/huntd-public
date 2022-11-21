import { QueueEventTypes } from '@/core/queue';
import { Service } from '@/core/Service';
import { User } from '@/models/User';
import { RecruiterProfileEntity } from '@/modules/recruiterProfile/RecruiterProfile.entity';
import { RecruiterProfileRepository } from '@/modules/recruiterProfile/recruiterProfile.repository';
import { UserInfo, SendPaymentRequestToTrelloOptions } from './payments.typedefs';

export class PaymentsService extends Service {
  private readonly recruiterRepository = this.makeRepository(
    RecruiterProfileRepository,
  );

  async sendPaymentRequestToTrello(
    options: SendPaymentRequestToTrelloOptions,
  ) {
    try {
      await this.gateways.queue.add(
        {
          type: QueueEventTypes.SendPaymentRequestToTrello,
          payload: options,
        },
      );
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getRecruiterInfo(user: User): Promise<UserInfo> {
    const latestRecruiterProfile = await this.recruiterRepository
      .getLatestRecruiterProfile({ userId: user.id });

    const recruiterProfileEntity = new RecruiterProfileEntity(
      latestRecruiterProfile,
    );

    const slug = await recruiterProfileEntity.resolveSlug();

    return {
      email: user.email,
      slug: slug ?? '',
    };
  }
}
