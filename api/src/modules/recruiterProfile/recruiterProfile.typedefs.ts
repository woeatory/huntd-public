export const CHURNED_RECRUITER_PERIOD = 14;

export enum RecruiterProfileErrors {
  NotFound = 'profile_not_found',
}

export enum RecruiterProfileStatusEnum {
  Draft = 'DRAFT',
  OnReview = 'ON_REVIEW',
  Rejected = 'REJECTED',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}
