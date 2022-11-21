import { QueueEvent, QueueEventTypes } from '@/core/queue';
import { SendNftRequestToTrelloOptions } from '@/modules/nft/nft.typedefs';

export type SendNftRequestToTrelloEvent = QueueEvent<
  QueueEventTypes.SendNftRequestToTrello,
  SendNftRequestToTrelloOptions
>;

export type NftEvents = SendNftRequestToTrelloEvent;
