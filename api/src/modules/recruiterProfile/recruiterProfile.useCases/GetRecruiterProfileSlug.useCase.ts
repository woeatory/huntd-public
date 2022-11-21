import { ValidationRules } from '@mate-academy/core';
import { RecruiterProfileEntity } from '@/modules/recruiterProfile/RecruiterProfile.entity';
import { UseCase } from '@/core';
import { RecruiterProfile } from '@/models/RecruiterProfile';

export interface GetRecruiterProfileSlugUseCaseOptions {
  recruiterProfile: RecruiterProfile;
}
export type GetRecruiterProfileSlugUseCaseResult = string | null;

type Options = GetRecruiterProfileSlugUseCaseOptions;
type Result = GetRecruiterProfileSlugUseCaseResult;

export class GetRecruiterProfileSlugUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      recruiterProfile: ['required'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const recruiterProfileEntity = new RecruiterProfileEntity(
      options.recruiterProfile,
    );

    return recruiterProfileEntity.resolveSlug();
  }
}
