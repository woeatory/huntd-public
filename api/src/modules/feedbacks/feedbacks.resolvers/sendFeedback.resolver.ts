import { makeAuthResolver } from '@/core';
import {
  SendFeedbackUseCase,
  SendFeedbackUseCaseOptions,
  SendFeedbackUseCaseResult,
} from '@/modules/feedbacks/feedbacks.useCases/SendFeedback.useCase';

export const sendFeedbackResolver = makeAuthResolver<
  SendFeedbackUseCaseOptions,
  SendFeedbackUseCaseResult
>(SendFeedbackUseCase);
