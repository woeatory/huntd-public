import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { UserMessagesTemplateRepository } from '@/modules/userMessagesTemplate/userMessagesTemplate.repository';
import { UserMessagesTemplate } from '@/models/UserMessagesTemplate';

export interface UpdateTemplateMessageUseCaseOptions {
  id: number;
  values: {
    messageTitle?: string;
    messageBody?: string;
  }
}
export type UpdateTemplateMessageUseCaseResult = UserMessagesTemplate;

type Options = UpdateTemplateMessageUseCaseOptions;
type Result = UpdateTemplateMessageUseCaseResult;

export class UpdateTemplateMessageUseCase extends AuthUseCase<Options, Result> {
  private readonly userMessagesTemplateRepository = this.makeRepository(
    UserMessagesTemplateRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
      values: [{
        nested_object: {
          messageTitle: ['string'],
          messageBody: ['string'],
        },
      }],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { id, values: { messageTitle, messageBody } } = options;

    return this.userMessagesTemplateRepository.updateTemplate({
      id,
      messageTitle,
      messageBody,
    });
  }
}
