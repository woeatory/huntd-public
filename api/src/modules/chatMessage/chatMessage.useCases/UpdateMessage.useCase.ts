import {
  ValidationRules,
} from '@mate-academy/core';
import { ChatMessage } from '@/models/ChatMessage';
import { AuthUseCase } from '@/core';
import { ChatMessageRepository } from '@/modules/chatMessage/chatMessage.repository';

export interface UpdateMessageUseCaseOptions {
  id: number;
  values: {
    message: string,
  }
}
export type UpdateMessageUseCaseResult = ChatMessage;

type Options = UpdateMessageUseCaseOptions;
type Result = UpdateMessageUseCaseResult;

export class UpdateMessageUseCase extends AuthUseCase<Options, Result> {
  private readonly chatMessageRepository = this.makeRepository(
    ChatMessageRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
      values: [{
        nested_object: {
          message: ['required', 'string'],
        },
      }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { id, values } = options;

    return this.chatMessageRepository.updateMessage(
      id,
      values,
    );
  }
}
