import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';

export interface GetTranslatesUseCaseOptions {
  lang: string;
  namespace: string;
}

export type GetTranslatesUseCaseResult = Record<string, string>;

type Options = GetTranslatesUseCaseOptions;
type Result = GetTranslatesUseCaseResult;

export class GetTranslatesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      lang: ['required', 'string'],
      namespace: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { lang, namespace } = options;

    const data = await this.models.Translate.findAll({
      attributes: ['code', 'value'],
      where: {
        namespace,
        language: lang,
      },
    });

    return data.reduce<Result>((acc, currentTranslate) => {
      Object.assign(acc, {
        [currentTranslate.code]: currentTranslate.value,
      });

      return acc;
    }, {});
  }
}
