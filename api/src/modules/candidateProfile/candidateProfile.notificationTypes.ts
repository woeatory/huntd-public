/* eslint-disable camelcase */

import {
  Notification,
} from '@mate-academy/notifications-gateway';

export type CandidateProfileApproved = Notification<
  {
    profile_link: string;
    first_name: string,
    community_link: string,
  }
>;

export type CandidateProfileRejected = Notification<
  {
    type: 'candidate';
    profile_link: string;
    first_name: string,
    reject_reason: string
  }
>;

export type CandidateAwaitingProfileReview = Notification<
  {
    profile_type: 'candidate';
    admin_link: string;
    impersonate_login_link: string;
    user_name: string;
    email:string;
    icon: string
  }
>;

export type NewVacancyRequest = Notification<
  {
    user_name: string;
    email:string;
    icon: string
    impersonate_login_link: string;
    vacancy_link: string;
    contact_email: string;
  }
>;

export type NewVacancyApplication = Notification<
  {
    user_name: string;
    company_name: string;
    job_title: string;
    email:string;
    icon: string
    impersonate_login_link: string;
  }
>;
