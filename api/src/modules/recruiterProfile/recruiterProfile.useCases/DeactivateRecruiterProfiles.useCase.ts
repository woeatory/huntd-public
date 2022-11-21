import { ValidationRules } from '@mate-academy/core';
import { Op } from 'sequelize';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import { AuthUseCase } from '@/core';

export type DeactivateRecruiterProfilesUseCaseOptions = unknown;
export type DeactivateRecruiterProfilesUseCaseResult = boolean;

type Options = DeactivateRecruiterProfilesUseCaseOptions;
type Result = DeactivateRecruiterProfilesUseCaseResult;

export class DeactivateRecruiterProfilesUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {};
  }

  protected async run(): Promise<Result> {
    await this.models.RecruiterProfile.update({
      status: RecruiterProfileStatusEnum.Inactive,
    }, {
      where: {
        userId: this.authUser.id,
        status: {
          [Op.in]: [
            RecruiterProfileStatusEnum.Draft,
            RecruiterProfileStatusEnum.Active,
            RecruiterProfileStatusEnum.OnReview,
          ],
        },
      },
    });

    this.gateways.analytics.sendEvent({
      userEmail: this.authUser.email,
      event: this.gateways.analytics.events.recruiterProfile
        .RecruiterProfileDeactivated,
      data: {},
    });

    return true;
  }
}
