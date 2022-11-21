import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { CandidateProfileEntity } from '@/modules/candidateProfile/CandidateProfile.entity';

export interface GetCandidateProfileSlugUseCaseOptions {
  candidateProfile: CandidateProfile;
}
export type GetCandidateProfileSlugUseCaseResult = string | null;

type Options = GetCandidateProfileSlugUseCaseOptions;
type Result = GetCandidateProfileSlugUseCaseResult;

export class GetCandidateProfileSlugUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfile: ['required'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const candidateProfileEntity = new CandidateProfileEntity(
      options.candidateProfile,
    );

    return candidateProfileEntity.resolveSlug();
  }
}
