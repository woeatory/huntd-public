import gql from 'graphql-tag';

export const ProfileConnectionSchema = gql`
  extend type Subscription {
    profileConnectionUpdated: ProfileConnection!
  }
  extend type Query {
    profileConnection(id: Int!): ProfileConnection
  }
  extend type Mutation {
    sendProfileConnectionRequest(
      candidateProfileId: Int!
      recruiterProfileId: Int!
    ): ProfileConnection!
    reviewProfileConnectionRequest(
      id: Int!
      status: ProfileConnectionStatus!
    ): ProfileConnection!
    reportOfferStatus(
      profileConnectionId: Int!
      status: OfferStatus!
    ): ProfileConnection!
    archiveProfileConnectionForUser(
      id: Int!
    ): Boolean
    unarchiveProfileConnectionForUser(
      id: Int!
    ): Boolean
    deleteProfileConnectionForUser(
      id: Int!
    ): Boolean
    updateConnectionLastActionTime(
      id: Int!
      time: GraphQLDateTime
    ): ProfileConnection
  }

  type ProfileConnection {
    id: Int!
    candidateUser: User
    recruiterUser: User!
    candidateProfile: CandidateProfile!
    recruiterProfile: RecruiterProfile!
    initiator: ProfileConnectionInitiator!
    status: ProfileConnectionStatus!
    chatMessages: [ChatMessage!]
    candidateReportedStatus: OfferStatus
    recruiterReportedStatus: OfferStatus
    userMeta: ProfileConnectionUserMeta
    buddyMeta: ProfileConnectionUserMeta
    candidateReportedAt: GraphQLDateTime
    recruiterReportedAt: GraphQLDateTime
    unreadMessagesCount: Int
    paidAt: GraphQLDateTime
    isPaymentRequested: Boolean!
  }

  enum ProfileConnectionInitiator {
    CANDIDATE
    RECRUITER
  }

  enum ProfileConnectionStatus {
    PENDING
    APPROVED
    REJECTED
  }

  enum OfferStatus {
    OFFER
    NO_OFFER
  }
`;
