import { ValidationRules } from '@mate-academy/core';
import { User } from '@/models/User';
import { UseCase } from '@/core';
import { ProfileConnectionEntity } from '@/modules/profileConnection/ProfileConnection.entity';
import { AdminSettingsRepository } from '@/modules/adminSettings/adminSettings.repository';

export interface GetCandidateProfileUserUseCaseOptions {
  candidateProfileId: number;
  userId: number
}
export type GetCandidateProfileUserUseCaseResult = User | Pick<User, 'id' | 'nfts'> | null;

type Options = GetCandidateProfileUserUseCaseOptions;
type Result = GetCandidateProfileUserUseCaseResult;

export class GetCandidateProfileUserUseCase extends UseCase<Options, Result> {
  private readonly adminSettingsRepository = this.makeRepository(
    AdminSettingsRepository,
  );

  protected get validation(): ValidationRules<Options> {
    return {
      candidateProfileId: ['required', 'positive_integer'],
      userId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    if (!this.authUser) {
      return this.dataLoaders.userBaseByIdLoader.load({
        id: options.userId,
      });
    }

    if (this.authUser.id === options.userId) {
      return this.authUser;
    }

    if (this.authUser.isAdminUser) {
      const adminSettings = await this.adminSettingsRepository.findByUserId(
        this.authUser.id,
      );

      if (adminSettings?.contactsVisibilityPermission) {
        return this.dataLoaders.userById.load({
          id: options.userId,
        });
      }
    }

    const profileConnection = await this.models.ProfileConnection.findOne({
      where: {
        candidateProfileId: options.candidateProfileId,
        recruiterUserId: this.authUser.id,
      },
    });

    if (!profileConnection) {
      return this.dataLoaders.userBaseByIdLoader.load({
        id: options.userId,
      });
    }

    const profileConnectionEntity = new ProfileConnectionEntity(
      profileConnection,
      this.authUser,
    );

    if (!profileConnectionEntity.hasAccessToCandidateUser) {
      return this.dataLoaders.userBaseByIdLoader.load({
        id: options.userId,
      });
    }

    return this.dataLoaders.userById.load({
      id: profileConnection.candidateUserId,
    });
  }
}
