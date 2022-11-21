import { ClientError, ClientErrorTypes, ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { ProfileConnectionService } from '@/modules/profileConnection/profileConnection.service';
import { ReportOfferStatusUseCaseOptions } from '@/modules/profileConnection/profileConnection.useCases/ReportOfferStatus.useCase';

export interface BulkReportOfferStatusUseCaseOptions {
  values: ReportOfferStatusUseCaseOptions[];
}

export type BulkReportOfferStatusUseCaseResult = boolean;

type Options = BulkReportOfferStatusUseCaseOptions;
type Result = BulkReportOfferStatusUseCaseResult;

export class BulkReportOfferStatusUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      values: ['required'],
    };
  }

  private readonly profileConnectionService = this.makeService(
    ProfileConnectionService,
  )

  protected async run({ values }: Options): Promise<Result> {
    try {
      await Promise.allSettled([
        ...values.map(
          (value) => this.profileConnectionService.reportOfferStatus(
            value,
          ),
        ),
      ]);

      return true;
    } catch (error) {
      throw new ClientError({
        error,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }
}
