import {
  ValidationRules,
} from '@mate-academy/core';
import { OfferStatusEnum } from '@/modules/profileConnection/profileConnection.typedefs';
import { ProfileConnection } from '@/models/ProfileConnection';
import { AuthUseCase } from '@/core';
import { CandidateProfileService } from '@/modules/candidateProfile/candidateProfile.service';
import { ProfileConnectionService } from '@/modules/profileConnection/profileConnection.service';

export interface ReportOfferStatusUseCaseOptions {
  profileConnectionId: number;
  status: OfferStatusEnum;
}
export type ReportOfferStatusUseCaseResult = ProfileConnection

type Options = ReportOfferStatusUseCaseOptions;
type Result = ReportOfferStatusUseCaseResult;

export class ReportOfferStatusUseCase extends AuthUseCase<Options, Result> {
  private readonly candidateProfileService = this.makeService(
    CandidateProfileService,
  )

  private readonly profileConnectionService = this.makeService(
    ProfileConnectionService,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      status: ['required', { one_of: Object.values(OfferStatusEnum) }],
      profileConnectionId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.profileConnectionService.reportOfferStatus(options);
  }
}
