import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';

export interface GetCandidateProfileConnectionsUseCaseOptions {
  candidateUserId: number;
}
export type GetCandidateProfileConnectionsUseCaseResult = number;

type Options = GetCandidateProfileConnectionsUseCaseOptions;
type Result = GetCandidateProfileConnectionsUseCaseResult;

export class GetCandidateProfileConnectionsUseCase extends UseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateUserId: ['required', 'positive_integer'],
    };
  }

  protected async run({ candidateUserId }: Options): Promise<Result> {
    const connections = await this.dataLoaders
      .profileConnectionsByCandidateUserId.load({
        candidateUserId,
      });

    return connections.length;
  }
}
