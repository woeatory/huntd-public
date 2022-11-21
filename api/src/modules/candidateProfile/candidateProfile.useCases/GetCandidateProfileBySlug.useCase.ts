import { ValidationRules } from '@mate-academy/core';
import { CandidateProfile } from '@/models/CandidateProfile';
import { UseCase } from '@/core';

export interface GetCandidateProfileBySlugUseCaseOptions {
  slug: string;
}
export type GetCandidateProfileBySlugUseCaseResult = CandidateProfile | null;

type Options = GetCandidateProfileBySlugUseCaseOptions;
type Result = GetCandidateProfileBySlugUseCaseResult;

export class GetCandidateProfileBySlugUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      slug: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.models.CandidateProfile.findOne({
      where: {
        slug: options.slug,
      },
    });
  }
}
