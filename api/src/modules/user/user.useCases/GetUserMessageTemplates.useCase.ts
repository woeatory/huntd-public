import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { MessageTypeEnum } from '@/modules/userMessagesTemplate/userMessagesTemplate.typedefs';
import { UserMessagesTemplate } from '@/models/UserMessagesTemplate';
import { UserRepository } from '@/modules/user/user.repository';

export type GetTemplateMessagesUseCaseOptions = {
  userId: number;
  messageType: MessageTypeEnum;
}
export type GetTemplateMessagesUseCaseResult = UserMessagesTemplate[];

type Options = GetTemplateMessagesUseCaseOptions;
type Result = GetTemplateMessagesUseCaseResult;

export class GetTemplateMessagesUseCase extends AuthUseCase<Options, Result> {
  private readonly userRepository = this.makeRepository(
    UserRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      userId: ['required', 'positive_integer'],
      messageType: ['required', { one_of: Object.values(MessageTypeEnum) }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    return this.userRepository.findUserMessageTemplates({
      userId: options.userId,
      messageType: options.messageType,
    });
  }
}
