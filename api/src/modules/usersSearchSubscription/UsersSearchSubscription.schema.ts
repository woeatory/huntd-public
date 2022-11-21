import gql from 'graphql-tag';

export const UsersSearchSubscriptionSchema = gql`
  extend type Query {
    usersSearchSubscriptions: [UsersSearchSubscription!]
    userSearchSubscriptionsByUserId(userId: Int): [UsersSearchSubscription!]
  }

  extend type Mutation {
    subscribeToCandidatesSearch(title: String!, userId: Int, searchParams: PublicProfilesParameters!): UsersSearchSubscription!
    unsubscribeFromCandidatesSearch(id: Int!, userId: Int!): Boolean!
    updateSubscriptionLastUsed(id: Int!, userId: Int!): UsersSearchSubscription!
    updateSubscriptionLastNotified(subscriptionsIds: [Int!]): Boolean!
    updateSubscriptionTitle(
      id: Int!,
      userId: Int!,
      values: UpdateSubscriptionsTitleValues!
    ): UsersSearchSubscription!
  }

  type UsersSearchSubscription {
    id: Int!
    userId: Int!
    title: String!
    lastUsed: GraphQLDateTime!
    lastNotified: GraphQLDateTime
    searchParams: CandidatesSearchParams!
    stringifiedSearchParams: SubscriptionStringifiedParams!
    user: User
    subscriptionUrl: String!
  }

  input UpdateSubscriptionsTitleValues {
    title: String!
  }

  type SubscriptionStringifiedParams {
    id: Int!
    employmentTypes: [EmploymentType!]
    technologies: [Technology!]
    jobExperiences: [JobExperience!]
    englishLevels: [EnglishLevel!]
  }

  type CandidatesSearchParams {
    cities: [String!]
    countries: [String!]
    specializations: [String!]
    salaryFrom: Int
    salaryTo: Int
    timezoneFrom: Int
    timezoneTo: Int
    timezoneReverseMode: Boolean
    searchQuery: String
    experienceIds: [Int!]
    englishLevelIds: [Int!]
    employmentTypesIds: [Int!]
    technologiesIds: [Int!]
  }
`;
