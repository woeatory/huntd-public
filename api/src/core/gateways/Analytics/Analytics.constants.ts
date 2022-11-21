export const AnalyticsEvents = {
  profileConnection: {
    NewProfileConnection: 'new_profile_connection',
    ArchiveProfileConnection: 'archive_profile_connection',
    UnarchiveProfileConnection: 'unarchive_profile_connection',
    DeleteProfileConnection: 'delete_profile_connection',
    ReportOfferStatus: 'report_offer_status',
  },
  candidateProfile: {
    CandidateProfileReviewed: 'candidate_profile_reviewed',
    CandidateProfileDeactivated: 'candidate_profile_deactivated',
  },
  recruiterProfile: {
    RecruiterProfileReviewed: 'recruiter_profile_reviewed',
    RecruiterProfileDeactivated: 'recruiter_profile_deactivated',
  },
  accountSettings: {
    UserPasswordChanged: 'user_password_changed',
  },
};
