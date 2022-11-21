import { QueueEventTypes } from '@/core/queue/QueueEventTypes';

/* eslint-disable max-len */
export const queueEventSQSURLMap: Record<QueueEventTypes, string> = {
  [QueueEventTypes.GetSingleSourceVacancies]: process.env.GET_SINGLE_SOURCE_VACANCIES,
  [QueueEventTypes.SendFeedbackToTrello]: process.env.SEND_FEEDBACK_TO_TRELLO,
  [QueueEventTypes.SendPaymentRequestToTrello]: process.env.SEND_PAYMENT_REQUEST_TO_TRELLO,
  [QueueEventTypes.SendNftRequestToTrello]: process.env.SEND_NFT_REQUEST_TO_TRELLO,
};
