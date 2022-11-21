import { ValidationRules, ClientError, ClientErrorTypes } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { ProfileConnectionUsersMetaRepository } from '@/modules/profileConnectionUserMeta/profileConnectionUserMeta.repository';

export interface UnarchiveProfileConnectionForUserUseCaseOptions {
  id: number;
}
export type UnarchiveProfileConnectionForUserUseCaseResult = boolean;

type Options = UnarchiveProfileConnectionForUserUseCaseOptions;
type Result = UnarchiveProfileConnectionForUserUseCaseResult;

export class UnarchiveProfileConnectionForUserUseCase extends AuthUseCase<
  Options, Result
> {
  private profileConnectionUsersMetaRepository = this.makeRepository(
    ProfileConnectionUsersMetaRepository,
  );

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    try {
      await this.profileConnectionUsersMetaRepository
        .updateProfileConnectionArchivedStatus({
          userId: this.authUser.id,
          profileConnectionId: options.id,
          archivedAt: null,
        });

      this.gateways.analytics.sendEvent({
        event: this.gateways.analytics.events.profileConnection
          .UnarchiveProfileConnection,
        userEmail: this.authUser.email,
        data: {},
      });

      return true;
    } catch (e) {
      throw new ClientError({
        message: e,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }
}
