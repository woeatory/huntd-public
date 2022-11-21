export interface UserInfo {
  email: string;
  slug: string;
}

export const NO_PROFILE_SLUG = 'has_no_profile';

export interface SendFeedbackToTrelloOptions {
  title: string;
  body: string;
  user: UserInfo;
}
