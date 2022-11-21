import { ValidationRules } from '@mate-academy/core';
import { getSuccessHtml } from '@/modules/oauth/mixins/getSuccessHtml';
import { UseCase } from '@/core';

export interface LinkedinCallbackUseCaseOptions {
  data: any;
}
export type LinkedinCallbackUseCaseResult = string;

type Options = LinkedinCallbackUseCaseOptions;
type Result = LinkedinCallbackUseCaseResult;

export class LinkedinCallbackUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      data: ['any_object'],
    };
  }

  getSuccessHtml = getSuccessHtml;

  protected async run(options: Options): Promise<Result> {
    const html = this.getSuccessHtml(options.data);

    return Promise.resolve(html);
  }
}
