import { ValidationRules } from '@mate-academy/core';
import { User } from '@/models/User';
import { UseCase } from '@/core';
import { ProfileConnectionEntity } from '@/modules/profileConnection/ProfileConnection.entity';

export interface GetRecruiterProfileUserUseCaseOptions {
  recruiterProfileId: number;
  userId: number
}
export type GetRecruiterProfileUserUseCaseResult = User | null;

type Options = GetRecruiterProfileUserUseCaseOptions;
type Result = GetRecruiterProfileUserUseCaseResult;

export class GetRecruiterProfileUserUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      recruiterProfileId: ['required', 'positive_integer'],
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (!this.authUser) {
      return null;
    }

    if (this.authUser.id === options.userId) {
      return this.authUser;
    }

    const profileConnection = await this.models.ProfileConnection.findOne({
      where: {
        recruiterProfileId: options.recruiterProfileId,
        candidateUserId: this.authUser.id,
      },
    });

    if (!profileConnection) {
      return null;
    }

    const profileConnectionEntity = new ProfileConnectionEntity(
      profileConnection,
      this.authUser,
    );

    if (!profileConnectionEntity.hasAccessToRecruiterUser) {
      return null;
    }

    return this.dataLoaders.userById.load({
      id: profileConnection.recruiterUserId,
    });
  }
}
