import {
  ValidationRules,
} from '@mate-academy/core';
import { ChatMessage } from '@/models/ChatMessage';
import { AuthUseCase } from '@/core';
import { ChatMessageService } from '../chatMessage.service';

export interface SendMessageUseCaseOptions {
  profileConnectionId: number;
  message: string;
}
export type SendMessageUseCaseResult = ChatMessage;

type Options = SendMessageUseCaseOptions;
type Result = SendMessageUseCaseResult;

export class SendMessageUseCase extends AuthUseCase<Options, Result> {
  private readonly chatMessageService = this.makeService(
    ChatMessageService,
  );

  protected get validation(): ValidationRules<Options> {
    return {
      profileConnectionId: ['required', 'positive_integer'],
      message: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.chatMessageService.sendMessage(options);
  }
}
