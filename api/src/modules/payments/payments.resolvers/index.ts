import { sendPaymentRequestResolver } from '@/modules/payments/payments.resolvers/sendPaymentRequest.resolver';

export const PaymentsResolvers = {
  Mutation: {
    sendPaymentRequest: sendPaymentRequestResolver,
  },
};
