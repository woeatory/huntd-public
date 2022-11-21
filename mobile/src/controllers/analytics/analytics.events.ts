export const AnalyticsEvents = {
  auth: {
    SignUp: 'sign_up',
    SignIn: 'sign_in',
  },
  cta: {
    CreateAccountClick: 'create_account_btn_click',
    SearchCandidatesClick: 'search_candidates_btn_click',
    SignUpLinkClick: 'sign_up_link_click',
    SignInLinkClick: 'sign_in_link_click',
  },
  userProfile: {
    ConnectSocialProviderClick: 'connect_social_provider',
    ActivateProfileClick: 'activate_profile_click',
    CandidateProfileFilled: 'candidate_profile_filled',
    SendProfileToModeration: 'send_profile_to_moderation',
    RecruiterProfileFilled: 'recruiter_profile_filled',
  },
  pageInteraction: {
    VisitCandidateProfile: 'visit_candidate_profile',
    ConnectCandidateProfile: 'connect_profile_click',
    ChooseProfileType: 'choose_profile_type',
    FiltersUsed: 'filters_used',
  },
  chatInteraction: {
    CandidateOpenContacts: 'candidate_opened_contacts',
    ChatOpened: 'chat_opened',
    MessageSent: 'message_sent',
  },
  subscriptions: {
    SubscriptionCreated: 'subscription_created',
    SubscriptionDeleted: 'subscription_deleted',
    SubscriptionUsed: 'subscription_used',
  },
};
