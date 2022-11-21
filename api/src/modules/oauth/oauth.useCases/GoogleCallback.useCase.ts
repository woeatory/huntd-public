import { ValidationRules } from '@mate-academy/core';
import { getSuccessHtml } from '@/modules/oauth/mixins/getSuccessHtml';
import { UseCase } from '@/core';

export interface GoogleCallbackUseCaseOptions {
  data: any;
}
export type GoogleCallbackUseCaseResult = string;

type Options = GoogleCallbackUseCaseOptions;
type Result = GoogleCallbackUseCaseResult;
export class GoogleCallbackUseCase extends UseCase<Options, Result> {
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
