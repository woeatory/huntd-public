import { ValidationRules } from '@mate-academy/core';
import { ServiceUseCase } from '@/core';
import { CandidateProfileRepository } from '@/modules/candidateProfile/candidateProfile.repository';
import { UserRepository } from '@/modules/user/user.repository';

export type DeactivateUnresponsiveProfilesUseCaseOptions = {
  userIds: number[]
};
export type DeactivateUnresponsiveProfilesUseCaseResult = boolean;

type Options = DeactivateUnresponsiveProfilesUseCaseOptions;
type Result = DeactivateUnresponsiveProfilesUseCaseResult;

export class DeactivateUnresponsiveProfilesUseCase extends ServiceUseCase<
  Options, Result
  > {
  private readonly candidateProfileRepository = this.makeRepository(
    CandidateProfileRepository,
  )

  private readonly userRepository = this.makeRepository(
    UserRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      userIds: [{ list_of: 'positive_integer' }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const deactivatedProfiles = await this.candidateProfileRepository
      .deactivateCandidateProfilesByUserIds({
        userIds: options.userIds,
      });

    const deactivatedUsersIds = deactivatedProfiles.map(
      (profile) => profile.userId,
    );

    const deactivatedUsers = await this.userRepository.findUsersByUserIds({
      userIds: deactivatedUsersIds,
    });

    if (deactivatedUsers.length > 0) {
      deactivatedUsers.forEach((user) => {
        this.gateways.analytics.sendEvent({
          userEmail: user.email,
          event: this.gateways.analytics.events.candidateProfile
            .CandidateProfileDeactivated,
          data: {},
        });
      });
    }

    return true;
  }
}
