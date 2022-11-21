import gql from 'graphql-tag';

export const USERS_SEARCH_SUBSCRIPTION_PARAMS_FRAGMENT = gql`
  fragment UsersSearchSubscriptionParams on UsersSearchSubscription {
    searchParams {
      cities
      specializations
      salaryFrom
      salaryTo
      searchQuery
      experienceIds
      englishLevelIds
      employmentTypesIds
      technologiesIds
    }
  }
`;
