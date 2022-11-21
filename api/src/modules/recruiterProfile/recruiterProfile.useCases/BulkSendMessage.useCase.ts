import { ClientError, ClientErrorTypes, ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { ProfileConnectionService } from '@/modules/profileConnection/profileConnection.service';
import { ProfileConnection } from '@/models/ProfileConnection';
import { ChatMessageService } from '@/modules/chatMessage/chatMessage.service';

export interface BulkSendMessageUseCaseOptions {
  recruiterProfileId: number;
  candidateProfileIds: number[];
  message: string;
}

export type BulkSendMessageUseCaseResult = boolean;

type Options = BulkSendMessageUseCaseOptions;
type Result = BulkSendMessageUseCaseResult;

export class BulkSendMessageUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      recruiterProfileId: ['required', 'positive_integer'],
      candidateProfileIds: ['required', { list_of: 'positive_integer' }],
      message: ['required', 'string'],
    };
  }

  private readonly profileConnectionService = this.makeService(
    ProfileConnectionService,
  )

  private readonly chatMessageService = this.makeService(
    ChatMessageService,
  );

  protected async run(options: Options): Promise<Result> {
    const {
      message, candidateProfileIds,
      recruiterProfileId,
    } = options;

    try {
      const profileConnections = await Promise.allSettled([
        ...candidateProfileIds.map(
          (candidateProfileId) => this.profileConnectionService
            .sendConnectionRequest({
              candidateProfileId,
              recruiterProfileId,
            }),
        ),
      ]);

      const createdConnections = profileConnections
        .filter(
          (result): result is PromiseFulfilledResult<ProfileConnection> => result.status === 'fulfilled',
        )
        .map((result) => result.value);

      await Promise.allSettled([
        createdConnections.map(
          (profileConnection) => this.chatMessageService
            .sendMessage({
              profileConnectionId: profileConnection.id,
              message,
            }),
        ),
      ]);

      return true;
    } catch (error) {
      throw new ClientError({
        error,
        type: ClientErrorTypes.BadRequest,
      });
    }
  }
}
