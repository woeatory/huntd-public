import gql from 'graphql-tag';

export const CandidateProfileSchema = gql`

  extend type Subscription {
    candidateProfileStatusUpdated: CandidateProfile!
  }
  extend type Query {
    latestCandidateProfile: CandidateProfile
    perfectCandidatesAmount(where: PublicProfilesParameters): Int!
    latestActiveCandidateProfile(userId: Int!): CandidateProfile
    publicCandidateProfiles(where: PublicProfilesParameters, options: PublicProfilesOptions): PublicCandidateProfilesResult!
    candidateProfileBySlug(slug: String!): CandidateProfile
    candidateProfilesBySubscription(subscriptionLastInteract: GraphQLDateTime!, where: PublicProfilesParameters!): [CandidateProfile!]!
  }

  type PublicCandidateProfilesResult {
    rows: [CandidateProfile!]!
    hasMore: Boolean!
    count: Int!
  }

  extend type Mutation {
    updateCandidateProfile(
      position: String
      salary: Float
      candidateDescription: String
      experienceDescription: String
      workExpectations: String
      achievements: String
      technologiesIds: [Int!]
      jobExperienceId: Int
      employmentTypesIds: [Int!]
      employmentLocationsIds: [Int!]
      englishLevelId: Int
      specializationId: Int
      specializationsIds: [Int!]
      cities: [CandidateProfileCityInput!]
      workPlaces: [CandidateProfileWorkPlaceInput!]
    ): CandidateProfile!

    sendCandidateProfileToReview: CandidateProfile!
    reviewCandidateProfile(
      id: Int!
      status: CandidateProfileStatus!
      rejectReason: String
    ): CandidateProfile!
    deactivateCandidateProfiles: Boolean!
    deactivateUnresponsiveProfiles(
      userIds: [Int!]
    ): Boolean!
  }

  enum CandidateProfileStatus {
    DRAFT
    ON_REVIEW
    REJECTED
    ACTIVE
    INACTIVE
  }

  type CandidateProfile {
    id: Int!
    userId: Int!
    slug: String
    status: CandidateProfileStatus!
    rejectReason: String
    position: String
    salary: Float
    candidateDescription: String
    experienceDescription: String
    workExpectations: String
    achievements: String
    specializations: [Specialization!]
    technologies: [Technology!]
    employmentTypes: [EmploymentType!]
    employmentLocations: [EmploymentLocation!]
    englishLevel: EnglishLevel
    jobExperience: JobExperience
    specialization: Specialization
    user: User
    cities: [CandidateProfileCity!]
    workPlaces: [CandidateProfileWorkPlace!]
    lastActionTime: GraphQLDateTime
    connectionsCount: Int
  }

  input PublicProfilesOptions {
    offset: Int
    username: String
    forceRealList: Boolean
  }

  input PublicProfilesParameters {
    cities: [String!]
    countries: [String!]
    locations: [String!]
    specializations: [String!]
    salaryFrom: Int
    salaryTo: Int
    timezoneFrom: Int
    timezoneTo: Int
    searchQuery: String
    experienceIds: [Int!]
    englishLevelIds: [Int!]
    employmentTypesIds: [Int!]
    technologiesIds: [Int!]
    timezoneReverseMode: Boolean
  }
`;
