import { ValidationRules } from '@mate-academy/core';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { UseCase } from '@/core';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';

// TODO: add filters
export type GetPublicRecruiterProfilesUseCaseOptions = unknown;
export type GetPublicRecruiterProfilesUseCaseResult = RecruiterProfile[];

type Options = GetPublicRecruiterProfilesUseCaseOptions;
type Result = GetPublicRecruiterProfilesUseCaseResult;

export class GetPublicRecruiterProfilesUseCase extends UseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    return this.models.RecruiterProfile.findAll({
      where: {
        status: RecruiterProfileStatusEnum.Active,
      },
      // TODO: consider publish date
      order: [
        ['updatedAt', 'desc'],
      ],
    });
  }
}
