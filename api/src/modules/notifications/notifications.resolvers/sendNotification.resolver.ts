import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import {
  SendNotificationUseCase,
  SendNotificationUseCaseOptions,
  SendNotificationUseCaseResult,
} from '@/modules/notifications/notifications.useCases/SendNotification.useCase';

export const sendNotificationResolver = makeServiceResolver<
  SendNotificationUseCaseOptions,
  SendNotificationUseCaseResult
>(SendNotificationUseCase);
