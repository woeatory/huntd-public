import gql from 'graphql-tag';

export const USERS_SEARCH_SUBSCRIPTION_PARAMS_FRAGMENT = gql`
  fragment UsersSearchSubscriptionParams on UsersSearchSubscription {
    searchParams {
      cities
      countries
      specializations
      salaryFrom
      salaryTo
      timezoneFrom
      timezoneTo
      timezoneReverseMode
      searchQuery
      experienceIds
      englishLevelIds
      employmentTypesIds
      technologiesIds
    }
  }
`;
