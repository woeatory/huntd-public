import { QueueEvent, QueueEventTypes } from '@/core/queue';
import { SendPaymentRequestToTrelloOptions } from '@/modules/payments/payments.typedefs';

export type SendPaymentRequestToTrelloEvent = QueueEvent<
  QueueEventTypes.SendPaymentRequestToTrello,
  SendPaymentRequestToTrelloOptions
>;

export type PaymentsEvents = SendPaymentRequestToTrelloEvent;
