import {
  ValidationRules,
} from '@mate-academy/core';
import { ProfileConnection } from '@/models/ProfileConnection';
import { AuthUseCase } from '@/core';
import { ProfileConnectionService } from '../profileConnection.service';

export interface SendProfileConnectionRequestUseCaseOptions {
  candidateProfileId: number;
  recruiterProfileId: number;
}
export type SendProfileConnectionRequestUseCaseResult = (
  ProfileConnection | null
);

type Options = SendProfileConnectionRequestUseCaseOptions;
type Result = SendProfileConnectionRequestUseCaseResult;

export class SendProfileConnectionRequestUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
      recruiterProfileId: ['required', 'positive_integer'],
    };
  }

  private readonly profileConnectionService = this.makeService(
    ProfileConnectionService,
  )

  protected async run(options: Options): Promise<Result> {
    return this.profileConnectionService.sendConnectionRequest(options);
  }
}
