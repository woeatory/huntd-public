import { makeController } from '@/core';
import { SendEventUseCase, SendEventUseCaseOptions, SendEventUseCaseResult } from '@/modules/amplitude/amplitude.useCases/sendEvent.useCase';

export const sendEventController = makeController<
  SendEventUseCaseOptions,
  SendEventUseCaseResult
>(
  SendEventUseCase,
  (req) => ({
    userEmail: String(req.query.userEmail),
    event: String(req.query.event as string),
  }),
);
