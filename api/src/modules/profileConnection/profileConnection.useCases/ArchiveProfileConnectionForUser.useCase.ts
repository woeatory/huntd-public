import { ValidationRules, ClientError, ClientErrorTypes } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { ProfileConnectionUsersMetaRepository } from '@/modules/profileConnectionUserMeta/profileConnectionUserMeta.repository';

export interface ArchiveProfileConnectionForUserUseCaseOptions {
  id: number;
}
export type ArchiveProfileConnectionForUserUseCaseResult = boolean;

type Options = ArchiveProfileConnectionForUserUseCaseOptions;
type Result = ArchiveProfileConnectionForUserUseCaseResult;

export class ArchiveProfileConnectionForUserUseCase extends AuthUseCase<
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
          archivedAt: Date.now(),
        });

      // TODO: send message in chat 'user archived this chat'

      this.gateways.analytics.sendEvent({
        event: this.gateways.analytics.events.profileConnection
          .ArchiveProfileConnection,
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
