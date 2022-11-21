/* eslint-disable camelcase */

import {
  Notification,
} from '@mate-academy/notifications-gateway';

export type SignUpNotification = Notification<
  {
    confirm_email_link: string
  }
>;
