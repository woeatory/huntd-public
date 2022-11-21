/* eslint-disable camelcase */

import {
  Notification,
} from '@mate-academy/notifications-gateway';

export type RecruiterProfileApproved = Notification<
  {
    type: 'recruiter';
    profile_link: string;
  }
>;

export type RecruiterProfileRejected = Notification<
  {
    type: 'recruiter';
    profile_link: string;
    reject_reason: string
  }
>;

export type RecruiterProfileActivated = Notification<
  {
    profile_type: 'recruiter';
    admin_link: string;
    impersonate_login_link: string;
    user_name: string;
    email:string;
    icon: string
  }
>;
