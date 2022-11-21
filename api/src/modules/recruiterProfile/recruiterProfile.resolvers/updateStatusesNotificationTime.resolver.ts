import { makeServiceResolver } from '@/core/makeResolver/makeServiceResolver';
import { UpdateStatusesNotificationTimeUseCase, UpdateStatusesNotificationTimeUseCaseOptions, UpdateStatusesNotificationTimeUseCaseResult } from '../recruiterProfile.useCases/UpdateStatusesNotificationTime.useCase';

export const updateStatusesNotificationTimeResolver = makeServiceResolver<
  UpdateStatusesNotificationTimeUseCaseOptions,
  UpdateStatusesNotificationTimeUseCaseResult
>(
  UpdateStatusesNotificationTimeUseCase,
);
