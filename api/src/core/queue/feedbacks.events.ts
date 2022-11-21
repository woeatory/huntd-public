import { QueueEvent, QueueEventTypes } from '@/core/queue';
import { UserInfo } from '@/modules/feedbacks/feedbacks.typedefs';

export interface SendFeedbackToTrelloParams {
  user: UserInfo;
  title: string;
  body: string;
}

export type SendFeedbackToTrelloEvent = QueueEvent<
  QueueEventTypes.SendFeedbackToTrello,
  SendFeedbackToTrelloParams
>;

export type FeedbacksEvents = SendFeedbackToTrelloEvent;
