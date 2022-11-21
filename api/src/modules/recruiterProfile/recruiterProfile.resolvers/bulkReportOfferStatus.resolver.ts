import { makeAuthResolver } from '@/core';
import {
  BulkReportOfferStatusUseCase,
  BulkReportOfferStatusUseCaseOptions,
  BulkReportOfferStatusUseCaseResult,
} from '../recruiterProfile.useCases/BulkReportOfferStatus.useCase';

export const bulkReportOfferStatusResolver = makeAuthResolver<
  BulkReportOfferStatusUseCaseOptions,
  BulkReportOfferStatusUseCaseResult
>(
  BulkReportOfferStatusUseCase,
);
