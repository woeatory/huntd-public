import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { UserMessagesTemplateRepository } from '@/modules/userMessagesTemplate/userMessagesTemplate.repository';

export interface DeleteTemplateMessageUseCaseOptions {
  id: number;
}
export type DeleteTemplateMessageUseCaseResult = boolean;

type Options = DeleteTemplateMessageUseCaseOptions;
type Result = DeleteTemplateMessageUseCaseResult;

export class DeleteTemplateMessageUseCase extends AuthUseCase<Options, Result> {
  private readonly userMessagesTemplateRepository = this.makeRepository(
    UserMessagesTemplateRepository,
  )

  protected get validation(): ValidationRules<Options> {
    return {
      id: ['required', 'positive_integer'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    await this.userMessagesTemplateRepository.deleteTemplate({
      id: options.id,
    });

    return true;
  }
}
