import { ValidationRules } from '@mate-academy/core';
import { ChatMessage } from '@/models/ChatMessage';
import { AuthUseCase } from '@/core';

// TODO: filters like limit, start, etc
export interface GetConnectionChatMessagesUseCaseOptions {
  profileConnectionId: number;
}
export type GetConnectionChatMessagesUseCaseResult = ChatMessage[];

type Options = GetConnectionChatMessagesUseCaseOptions;
type Result = GetConnectionChatMessagesUseCaseResult;

export class GetConnectionChatMessagesUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      profileConnectionId: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.models.ChatMessage.findAll({
      where: {
        profileConnectionId: options.profileConnectionId,
      },
      order: [
        ['id', 'ASC'],
      ],
    });
  }
}
