import { ValidationRules } from '@mate-academy/core';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { UseCase } from '@/core';

export interface GetRecruiterProfileBySlugUseCaseOptions {
  slug: string;
}
export type GetRecruiterProfileBySlugUseCaseResult = RecruiterProfile | null;

type Options = GetRecruiterProfileBySlugUseCaseOptions;
type Result = GetRecruiterProfileBySlugUseCaseResult;

export class GetRecruiterProfileBySlugUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      slug: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.models.RecruiterProfile.findOne({
      where: {
        slug: options.slug,
      },
    });
  }
}
