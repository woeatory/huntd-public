import { sendFeedbackResolver } from '@/modules/feedbacks/feedbacks.resolvers/sendFeedback.resolver';

export const FeedbacksResolvers = {
  Mutation: {
    sendFeedback: sendFeedbackResolver,
  },
};
