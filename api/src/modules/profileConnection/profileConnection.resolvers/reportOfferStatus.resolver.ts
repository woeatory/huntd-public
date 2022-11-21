import { makeAuthResolver } from '@/core';
import {
  ReportOfferStatusUseCase,
  ReportOfferStatusUseCaseOptions,
  ReportOfferStatusUseCaseResult,
} from '@/modules/profileConnection/profileConnection.useCases/ReportOfferStatus.useCase';

export const reportOfferStatusResolver = makeAuthResolver<
  ReportOfferStatusUseCaseOptions,
  ReportOfferStatusUseCaseResult
>(
  ReportOfferStatusUseCase,
);
