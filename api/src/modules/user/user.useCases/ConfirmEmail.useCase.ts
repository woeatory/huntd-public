import { ClientError, ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { User } from '@/models/User';

import {
  CONFIRM_EMAIL_INVALID_TOKEN,
} from '@/auth/auth.constants';

export interface ConfirmEmailUseCaseOptions {
  token: string;
}

export type ConfirmEmailUseCaseResult = boolean;

type Options = ConfirmEmailUseCaseOptions;
type Result = ConfirmEmailUseCaseResult;

export class ConfirmEmailUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      token: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const { token } = options;
    const user = await User.findOne({
      where: { confirmEmailToken: token },
    });

    if (!user) {
      throw new ClientError({
        message: CONFIRM_EMAIL_INVALID_TOKEN,
      });
    }

    try {
      await user.update({
        confirmed: true,
        confirmEmailToken: null,
      });

      // TODO: send amplitude event from backend
      this.logger.info('User has confirmed email', { userId: user.id });
    } catch (e) {
      // do nothing
    }

    return true;
  }
}
