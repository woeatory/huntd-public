/* eslint-disable camelcase */

import { Notification } from '@mate-academy/notifications-gateway';

export type NewProfileConnection = Notification<
  {
    user_name: string;
    chat_link: string;
    buddy_name: string
  }
>;

export type OfferStatusChanged = Notification<
  {
    user_name: string;
    chat_link: string;
    buddy_name: string
  }
>;
