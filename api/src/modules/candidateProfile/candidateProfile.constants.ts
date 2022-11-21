export const CANDIDATE_PROFILES_QUERY_LIMIT = 20;

export enum SalaryRange {
  Min = 0,
  Max = 10000,
}

export enum TimezoneRange {
  Min = -12,
  Max = 12,
}

export enum CandidateProfileEvents {
  StatusUpdated = 'candidate_profile_status_updated'
}

export enum CandidateProfileErrors {
  ProfileNotExists = 'candidate_profile_not_exists',
  ProfileInvalidStatus = 'candidate_profile_invalid_status',
  CandidateProfileContactsNotFilled = 'candidate_profile_contacts_not_filled'
}
