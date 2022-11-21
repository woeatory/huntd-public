import fs from 'fs';
import path from 'path';
import { NodeEnvironments, ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { Translate } from '@/models/Translate';

export interface SaveTranslatesUseCaseOptions {
  lang: string;
  namespace: string;
  body: Record<string, string>
}

export type SaveTranslatesUseCaseResult = boolean;

type Options = SaveTranslatesUseCaseOptions;
type Result = SaveTranslatesUseCaseResult;

type TranslateKeys = Pick<Translate, 'code' | 'language' | 'namespace' | 'value'>;

const queue: Array<TranslateKeys> = [];

let timeout: NodeJS.Timeout | null = null;

const enqueue = (
  values: Array<TranslateKeys>,
  callback: (values: Array<TranslateKeys>) => void,
) => {
  if (timeout) {
    global.clearTimeout(timeout);
  }

  queue.push(...values);

  timeout = global.setTimeout(
    () => {
      callback(queue);
    },
    100,
  );
};

export class SaveTranslatesUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      lang: ['required', 'string'],
      namespace: ['required', 'string'],
      body: ['required', 'any_object'],
    };
  }

  private static getUnique(arr: Array<TranslateKeys>) {
    const existing: Record<string, boolean> = {};

    return arr.filter((item) => {
      const key = `${item.language}_${item.namespace}_${item.code}`;

      if (existing[key]) {
        return false;
      }

      existing[key] = true;

      return true;
    });
  }

  private async processTranslates(values: Array<TranslateKeys>) {
    const file = 'translate.missing.json';

    let translates: Array<TranslateKeys> = [];

    try {
      const content = await fs.promises.readFile(path.join(__dirname, '..', file));

      translates = JSON.parse(content.toString());
    } catch (e) {
      this.logger.info(`Can't read file ${file}`, e.message);
    }

    const fields: Array<keyof TranslateKeys> = ['namespace', 'code', 'language'];

    translates = SaveTranslatesUseCase.getUnique([
      ...translates,
      ...values,
    ])
      .sort((a, b) => {
        for (let i = 0; i < fields.length; i += 1) {
          const field = fields[i];
          const compare = a[field].localeCompare(b[field]);

          if (compare) {
            return compare;
          }
        }

        return 0;
      });

    if (process.env.NODE_ENV === NodeEnvironments.Production) {
      this.logger.error('Missing translates found', translates);
    }

    await fs.promises.writeFile(
      path.join(__dirname, '..', file),
      JSON.stringify(translates, null, 2),
    );
  }

  protected async run(options: Options): Promise<Result> {
    const { lang, namespace, body } = options;

    const entries = Object.entries(body);

    enqueue(
      entries.map(([code, value]) => ({
        language: lang, namespace, code, value,
      })),
      this.processTranslates.bind(this),
    );

    return true;
  }
}
