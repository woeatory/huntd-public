import { ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { FeedbacksService } from '@/modules/feedbacks/feedbacks.service';

export type SendFeedbackUseCaseOptions = {
  title: string;
  body: string;
};
export type SendFeedbackUseCaseResult = boolean | Error;

type Options = SendFeedbackUseCaseOptions;
type Result = SendFeedbackUseCaseResult;

export class SendFeedbackUseCase extends AuthUseCase<Options, Result> {
  private readonly feedbacksService = this.makeService(
    FeedbacksService,
  )

  protected get validation(): ValidationRules<Options> | null {
    return {
      title: ['required', 'string'],
      body: ['string'],
    };
  }

  protected async run({ title, body }: Options): Promise<Result> {
    try {
      const userInfo = await this.feedbacksService.getUserInfo(this.authUser);

      await this.feedbacksService.sendFeedbackToTrello({
        user: userInfo,
        title,
        body: body ?? '',
      });
    } catch {
      return false;
    }

    return true;
  }
}
