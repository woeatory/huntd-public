import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';

export interface SendEventUseCaseOptions {
  userEmail: string;
  event: string;
}

export type SendEventUseCaseResult = unknown;

type Options = SendEventUseCaseOptions;
type Result = SendEventUseCaseResult;

export class SendEventUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      userEmail: ['required', 'string'],
      event: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { userEmail, event } = options;

    return this.gateways.analytics.sendEvent({
      userEmail,
      event,
      data: {},
    });
  }
}
