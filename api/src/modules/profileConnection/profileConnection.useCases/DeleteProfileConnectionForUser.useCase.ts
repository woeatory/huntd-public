import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';

export interface DeleteProfileConnectionForUserUseCaseOptions {
  id: number;
}
export type DeleteProfileConnectionForUserUseCaseResult = boolean;

type Options = DeleteProfileConnectionForUserUseCaseOptions;
type Result = DeleteProfileConnectionForUserUseCaseResult;

export class DeleteProfileConnectionForUserUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    await this.models.ProfileConnectionUserMeta.destroy(
      {
        where: {
          userId: this.authUser.id,
          profileConnectionId: options.id,
        },
      },
    );

    // TODO: send message in chat 'user deleted this chat'

    this.gateways.analytics.sendEvent({
      event: this.gateways.analytics.events.profileConnection
        .DeleteProfileConnection,
      userEmail: this.authUser.email,
      data: {},
    });

    return true;
  }
}
