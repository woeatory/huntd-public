import { makeAuthResolver } from '@/core';
import {
  BulkSendMessageUseCase,
  BulkSendMessageUseCaseOptions,
  BulkSendMessageUseCaseResult,
} from '../recruiterProfile.useCases/BulkSendMessage.useCase';

export const bulkSendMessageResolver = makeAuthResolver<
  BulkSendMessageUseCaseOptions,
  BulkSendMessageUseCaseResult
>(
  BulkSendMessageUseCase,
);
