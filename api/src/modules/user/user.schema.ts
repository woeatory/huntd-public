import gql from 'graphql-tag';

export const UserSchema = gql`
  extend type Subscription {
    userUnreadMessagesCountUpdated: User
  }

  extend type Query {
    authUser: User
    adminUser: User
    serviceUser: User
    usersWithChurnedCandidateProfiles: [ChurnedUser!]
    userByUsername(username: String): User
    usersByPendingConnections: [User!]
  }

  extend type Mutation {
    signUp(
      email: String!,
      phone: String,
      password: String!,
      repeatPassword: String!,
      firstName: String,
      lastName: String,
      fvType: String,
      fvSource: String,
      fvMedium: String,
      fvCampaign: String,
      fvContent: String,
      fvTerm: String,
      lvType: String,
      lvSource: String,
      lvMedium: String,
      lvCampaign: String,
      lvContent: String,
      lvTerm: String,
      gClientid: String,
      gIp: String,
      gAgent: String,
      gclid: String,
    ): User!
     signUpAsInactiveUser(
      username: String!
      email: String!,
      phone: String,
      password: String!,
      repeatPassword: String!,
      firstName: String,
      lastName: String,
      fvType: String,
      fvSource: String,
      fvMedium: String,
      fvCampaign: String,
      fvContent: String,
      fvTerm: String,
      lvType: String,
      lvSource: String,
      lvMedium: String,
      lvCampaign: String,
      lvContent: String,
      lvTerm: String,
      gClientid: String,
      gIp: String,
      gAgent: String,
      gclid: String,
    ): User!
    signIn(email: String!, password: String!): User!
    signInAsUser(email: String!): User!
    forgotPassword(email: String!): Boolean!
    resetPassword(token: String!, password: String!, repeatPassword: String!): Boolean!
    confirmEmail(token: String!): Boolean!
    sendConfirmEmailLink: Boolean!
    logOut: Boolean!
    logOutFromUser: User!
    updateProfileContacts(
      phone: String
      firstName: String
      lastName: String
      linkedinUrl: String
      behanceUrl: String
      githubUrl: String
      ethWalletAddress: String
    ): User!
    uploadCvFile(file: Upload!, size: Int): User!
    removeCvFile: User!
    uploadAvatar(
      file: Upload!,
      size: Int
    ): User!
    setNftAvatar(nftId: Int): User!
    changePassword(
      currentPassword: String!
      password: String!
      repeatPassword: String!
    ): Boolean!
    createUser(
       firstName: String!
       lastName: String!
    ): User!
  }

  enum PrimaryProfile {
    RECRUITER
    CANDIDATE
    NOT_DEFINED
  }

  enum UserRole {
    USER
    ADMIN
  }

  type ChurnedUser {
    id: Int!
    firstName: String
    email: String!
    profilesCount: Int!
    profileId: Int!
    slug: String
    profileCreatedAt: GraphQLDateTime!
  }

  type User {
    id: Int!
    isAuthUser: Boolean
    isAdminUser: Boolean
    firstName: String
    lastName: String
    username: String
    computedName: String
    email: String
    phone: String
    inactive: Boolean
    fvType: String
    fvSource: String
    fvMedium: String
    fvCampaign: String
    fvContent: String
    fvTerm: String
    lvType: String
    lvSource: String
    lvMedium: String
    lvCampaign: String
    lvContent: String
    lvTerm: String
    gClientid: String
    gIp: String
    gAgent: String
    gclid: String
    confirmed: Boolean
    linkedinUrl: String
    behanceUrl: String
    githubUrl: String
    primaryProfile: PrimaryProfile
    profileConnections(archived: Boolean): [ProfileConnection!]
    hires: [ProfileConnection!]
    lastActionTime: GraphQLDateTime
    unreadMessagesCount: Int
    userRole: UserRole
    cv: UploadedFile
    avatar: UploadedFile
    searchSubscriptions: [UsersSearchSubscription!]
    messageTemplates(
      messageType: PrimaryProfile!
    ): [UserTemplateMessage!]
    isFirstTimeFillingCandidateProfile: Boolean
    isFirstTimeFillingRecruiterProfile: Boolean
    settings: UserSettings
    adminSettings: AdminSettings
    hasVacanciesSource: Boolean
    recruiterProfiles: [RecruiterProfile!]
    ethWalletAddress: String
    nfts: [Nft!]
  }

  extend type User {
    created: Boolean # used to check whether user is created on signUp
  }
`;
