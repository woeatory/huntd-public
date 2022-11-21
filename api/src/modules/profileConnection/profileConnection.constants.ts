export enum ProfileConnectionEvents {
  ProfileConnectionUpdated = 'profile_connection_updated'
}

export enum ProfileConnectionErrors {
  CandidateProfileNotActive = 'candidate_profile_not_active',
  CandidateProfileNotFound = 'candidate_profile_not_found',
  RecruiterProfileNotActive = 'recruiter_profile_not_active',
  RecruiterProfileNotFound = 'recruiter_profile_not_found',
  ProfilesOfTheSameUser = 'profiles_of_the_same_user',
  NotAuthUserProfiles = 'not_auth_user_profiles',
  ProfileConnectionNotFound = 'profile_connection_not_found',
  ProfileConnectionAlreadyReviewed = 'profile_connection_already_reviewed',
  UserNotAllowedToReviewConnection = 'user_not_allowed_to_review_connection',
  ConnectionUserNotFound = 'connection_user_not_found',
  ConnectionUserForbidden = 'connection_user_forbidden',
  ConnectionNotFound = 'connection_not_found',
}
