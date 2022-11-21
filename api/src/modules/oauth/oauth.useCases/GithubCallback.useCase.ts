import { ValidationRules } from '@mate-academy/core';
import { getSuccessHtml } from '@/modules/oauth/mixins/getSuccessHtml';
import { UseCase } from '@/core';

export interface GitHubCallbackUseCaseOptions {
  data: any;
}
export type GitHubCallbackUseCaseResult = string;

type Options = GitHubCallbackUseCaseOptions;
type Result = GitHubCallbackUseCaseResult;

export class GitHubCallbackUseCase extends UseCase<Options, Result> {
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
