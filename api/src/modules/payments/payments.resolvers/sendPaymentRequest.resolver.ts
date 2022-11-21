import { makeAuthResolver } from '@/core';
import {
  SendPaymentRequestUseCase,
  SendPaymentRequestUseCaseOptions,
  SendPaymentRequestUseCaseResult,
} from '@/modules/payments/payments.useCases/SendPaymentRequest.useCase';

export const sendPaymentRequestResolver = makeAuthResolver<
  SendPaymentRequestUseCaseOptions,
  SendPaymentRequestUseCaseResult
>(SendPaymentRequestUseCase);
