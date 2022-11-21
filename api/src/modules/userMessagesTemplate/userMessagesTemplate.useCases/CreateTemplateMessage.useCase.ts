import { ValidationRules } from '@mate-academy/core';
import { UserMessagesTemplate } from '@/models/UserMessagesTemplate';
import { AuthUseCase } from '@/core';
import { MessageTypeEnum } from '@/modules/userMessagesTemplate/userMessagesTemplate.typedefs';
import { UserMessagesTemplateRepository } from '@/modules/userMessagesTemplate/userMessagesTemplate.repository';

export interface CreateTemplateMessageUseCaseOptions {
  userId: number;
  messageTitle: string;
  messageBody: string;
  messageType: MessageTypeEnum;
}
export type CreateTemplateMessageUseCaseResult = UserMessagesTemplate;

type Options = CreateTemplateMessageUseCaseOptions;
type Result = CreateTemplateMessageUseCaseResult;

export class CreateTemplateMessageUseCase extends AuthUseCase<Options, Result> {
  private readonly userMessagesTemplateRepository = this.makeRepository(
    UserMessagesTemplateRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
      messageTitle: ['required', 'string'],
      messageBody: ['required', 'string'],
      messageType: ['required', { one_of: Object.values(MessageTypeEnum) }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.userMessagesTemplateRepository.createTemplate({
      userId: options.userId,
      messageTitle: options.messageTitle,
      messageBody: options.messageBody,
      messageType: options.messageType,
    });
  }
}
