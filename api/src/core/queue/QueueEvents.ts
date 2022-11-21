import { GetSingleSourceVacanciesEvent } from '@/core/queue/atsParser.events';
import { SendPaymentRequestToTrelloEvent } from '@/core/queue/payments.events';
import { SendFeedbackToTrelloEvent } from '@/core/queue/feedbacks.events';
import { SendNftRequestToTrelloEvent } from '@/core/queue/nft.events';

export type QueueEvents =
  GetSingleSourceVacanciesEvent
  | SendFeedbackToTrelloEvent
  | SendPaymentRequestToTrelloEvent
  | SendNftRequestToTrelloEvent;
