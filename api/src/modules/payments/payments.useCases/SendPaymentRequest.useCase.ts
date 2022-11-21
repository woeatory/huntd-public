import { ClientError, ClientErrorTypes, ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { PaymentsService } from '@/modules/payments/payments.service';
import { ProfileConnectionRepository } from '@/modules/profileConnection/profileConnection.repository';
import { ProfileConnection } from '@/models/ProfileConnection';
import { ProfileConnectionErrors } from '@/modules/profileConnection/profileConnection.constants';

export type SendPaymentRequestUseCaseOptions = {
  profileConnectionId: number;
  paymentAmount: number;
  candidateSlug: string;
};
export type SendPaymentRequestUseCaseResult = ProfileConnection | Error;

type Options = SendPaymentRequestUseCaseOptions;
type Result = SendPaymentRequestUseCaseResult;

export class SendPaymentRequestUseCase extends AuthUseCase<Options, Result> {
  private readonly paymentsService = this.makeService(
    PaymentsService,
  )

  private readonly profileConnectionsRepository = this.makeRepository(
    ProfileConnectionRepository,
  )

  protected get validation(): ValidationRules<Options> | null {
    return {
      profileConnectionId: ['required', 'positive_integer'],
      paymentAmount: ['required', 'positive_decimal'],
      candidateSlug: ['required', 'string'],
    };
  }

  protected async run({
    profileConnectionId,
    paymentAmount,
    candidateSlug,
  }: Options): Promise<Result> {
    try {
      const userInfo = await this.paymentsService.getRecruiterInfo(
        this.authUser,
      );

      const profileConnection = await this.profileConnectionsRepository
        .findProfileConnectionByConnectionId({
          profileConnectionId,
          userId: this.authUser.id,
        });

      if (!profileConnection) {
        throw new ClientError({
          message: ProfileConnectionErrors.ProfileConnectionNotFound,
          type: ClientErrorTypes.NotFound,
        });
      }

      await this.paymentsService.sendPaymentRequestToTrello({
        user: userInfo,
        profileConnectionId: profileConnection.id,
        paymentAmount,
        candidateSlug,
      });

      return profileConnection?.update({
        isPaymentRequested: true,
      });
    } catch (e) {
      throw new ClientError({
        message: e,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }
}
