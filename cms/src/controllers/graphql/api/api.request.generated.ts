import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GraphQLDateTime: string;
  Upload: any;
};

export type AdminSettings = {
  __typename?: 'AdminSettings';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  contactsVisibilityPermission: Scalars['Boolean'];
  silentProfileUpdate: Scalars['Boolean'];
};

export type UpdateAdminSettingsValues = {
  contactsVisibilityPermission: Scalars['Boolean'];
  silentProfileUpdate: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addVacanciesLogo: Scalars['Int'];
  archiveProfileConnectionForUser?: Maybe<Scalars['Boolean']>;
  bulkReportOfferStatus: Scalars['Boolean'];
  bulkSendMessage: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  claimNft?: Maybe<Nft>;
  confirmEmail: Scalars['Boolean'];
  connectOAuthProvider: Scalars['Boolean'];
  createMessageTemplate: UserTemplateMessage;
  createMultipleVacanciesSources: Scalars['Int'];
  createRecruiterProfile: RecruiterProfile;
  createSourcedVacancies: Scalars['Int'];
  createTechnologies?: Maybe<Array<Technology>>;
  createTechnology: Technology;
  createUser: User;
  createVacanciesSource?: Maybe<VacanciesSource>;
  createWorkPlace: CandidateProfileWorkPlace;
  deactivateCandidateProfiles: Scalars['Boolean'];
  deactivateRecruiterProfiles: Scalars['Boolean'];
  deactivateUnresponsiveProfiles: Scalars['Boolean'];
  deleteMessageTemplate: Scalars['Boolean'];
  deleteObsoleteSourcedVacancies: Scalars['Int'];
  deleteProfileConnectionForUser?: Maybe<Scalars['Boolean']>;
  deleteWorkPlace: Scalars['Boolean'];
  disconnectOAuthProvider: Scalars['Boolean'];
  fetchWorkPlaces?: Maybe<Array<CandidateProfileWorkPlace>>;
  forgotPassword: Scalars['Boolean'];
  logOut: Scalars['Boolean'];
  logOutFromUser: User;
  registerDevice?: Maybe<DeviceToken>;
  removeCvFile: User;
  reportOfferStatus: ProfileConnection;
  resetPassword: Scalars['Boolean'];
  reviewCandidateProfile: CandidateProfile;
  reviewProfileConnectionRequest: ProfileConnection;
  reviewRecruiterProfile: RecruiterProfile;
  sendCandidateProfileToReview: CandidateProfile;
  sendConfirmEmailLink: Scalars['Boolean'];
  sendFeedback: Scalars['Boolean'];
  sendMessage: ChatMessage;
  sendNewVacancyApplication: Scalars['Boolean'];
  sendNewVacancyRequest: Scalars['Boolean'];
  sendNotification: Scalars['Boolean'];
  sendPaymentRequest: ProfileConnection;
  sendProfileConnectionRequest: ProfileConnection;
  sendRecruiterProfileToReview: RecruiterProfile;
  setNftAvatar: User;
  signIn: User;
  signInAsUser: User;
  signUp: User;
  signUpAsInactiveUser: User;
  socialSignUp: User;
  socialSignUpAsInactiveUser: User;
  subscribeToCandidatesSearch: UsersSearchSubscription;
  unarchiveProfileConnectionForUser?: Maybe<Scalars['Boolean']>;
  unregisterDevice?: Maybe<Scalars['Boolean']>;
  unsubscribeFromCandidatesSearch: Scalars['Boolean'];
  updateAdminSettings: AdminSettings;
  updateCandidateProfile: CandidateProfile;
  updateConnectionLastActionTime?: Maybe<ProfileConnection>;
  updateMessage: ChatMessage;
  updateMessageTemplate: UserTemplateMessage;
  updateProfileContacts: User;
  updateRecruiterProfile: RecruiterProfile;
  updateStatusesNotificationTime: Scalars['Boolean'];
  updateSubscriptionLastNotified: Scalars['Boolean'];
  updateSubscriptionLastUsed: UsersSearchSubscription;
  updateSubscriptionTitle: UsersSearchSubscription;
  updateUserSettings: UserSettings;
  updateWorkPlace: CandidateProfileWorkPlace;
  uploadAvatar: User;
  uploadCvFile: User;
};


export type MutationAddVacanciesLogoArgs = {
  companyNames?: Maybe<Array<Scalars['String']>>;
};


export type MutationArchiveProfileConnectionForUserArgs = {
  id: Scalars['Int'];
};


export type MutationBulkReportOfferStatusArgs = {
  values: Array<ReportOfferStatusValues>;
};


export type MutationBulkSendMessageArgs = {
  recruiterProfileId: Scalars['Int'];
  candidateProfileIds: Array<Scalars['Int']>;
  message: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
};


export type MutationClaimNftArgs = {
  nftId?: Maybe<Scalars['Int']>;
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationConnectOAuthProviderArgs = {
  provider: OAuthProviders;
  token: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateMessageTemplateArgs = {
  userId: Scalars['Int'];
  messageType: PrimaryProfile;
  messageTitle: Scalars['String'];
  messageBody: Scalars['String'];
};


export type MutationCreateMultipleVacanciesSourcesArgs = {
  options: CreateMultipleVacanciesSourcesParameters;
};


export type MutationCreateRecruiterProfileArgs = {
  userId: Scalars['Int'];
  position: Scalars['String'];
  companyName: Scalars['String'];
};


export type MutationCreateSourcedVacanciesArgs = {
  vacancies?: Maybe<Array<SourcedVacancy>>;
};


export type MutationCreateTechnologiesArgs = {
  slugs?: Maybe<Array<Scalars['String']>>;
};


export type MutationCreateTechnologyArgs = {
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};


export type MutationCreateVacanciesSourceArgs = {
  atsId: Scalars['String'];
  type: VacancySourceType;
};


export type MutationCreateWorkPlaceArgs = {
  candidateProfileId: Scalars['Int'];
  companyName: Scalars['String'];
  companyUrl?: Maybe<Scalars['String']>;
  companySizeFrom?: Maybe<Scalars['Int']>;
  companySizeTo?: Maybe<Scalars['Int']>;
  companyIndustry?: Maybe<Scalars['String']>;
  companyCategories?: Maybe<Scalars['String']>;
  companySpecialities?: Maybe<Scalars['String']>;
  companyFundingType?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  startDate: Scalars['String'];
  endDate?: Maybe<Scalars['String']>;
};


export type MutationDeactivateUnresponsiveProfilesArgs = {
  userIds?: Maybe<Array<Scalars['Int']>>;
};


export type MutationDeleteMessageTemplateArgs = {
  id: Scalars['Int'];
  userId?: Maybe<Scalars['Int']>;
};


export type MutationDeleteProfileConnectionForUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteWorkPlaceArgs = {
  id: Scalars['Int'];
};


export type MutationDisconnectOAuthProviderArgs = {
  provider: OAuthProviders;
};


export type MutationFetchWorkPlacesArgs = {
  linkedinUrl: Scalars['String'];
  candidateProfileId: Scalars['Int'];
  liveScrape?: Maybe<Scalars['Boolean']>;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterDeviceArgs = {
  token: Scalars['String'];
  devicePlatform: DevicePlatform;
  deviceYear?: Maybe<Scalars['String']>;
  systemVersion?: Maybe<Scalars['String']>;
  deviceName?: Maybe<Scalars['String']>;
};


export type MutationReportOfferStatusArgs = {
  profileConnectionId: Scalars['Int'];
  status: OfferStatus;
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
};


export type MutationReviewCandidateProfileArgs = {
  id: Scalars['Int'];
  status: CandidateProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
};


export type MutationReviewProfileConnectionRequestArgs = {
  id: Scalars['Int'];
  status: ProfileConnectionStatus;
};


export type MutationReviewRecruiterProfileArgs = {
  id: Scalars['Int'];
  status: RecruiterProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
};


export type MutationSendFeedbackArgs = {
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
};


export type MutationSendMessageArgs = {
  profileConnectionId: Scalars['Int'];
  message: Scalars['String'];
};


export type MutationSendNewVacancyApplicationArgs = {
  companyName: Scalars['String'];
  jobTitle: Scalars['String'];
};


export type MutationSendNewVacancyRequestArgs = {
  vacancyLink: Scalars['String'];
  contactEmail: Scalars['String'];
};


export type MutationSendNotificationArgs = {
  channel: NotificationChannel;
  target: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
  payload?: Maybe<Scalars['String']>;
};


export type MutationSendPaymentRequestArgs = {
  profileConnectionId: Scalars['Int'];
  paymentAmount: Scalars['Int'];
  candidateSlug: Scalars['String'];
};


export type MutationSendProfileConnectionRequestArgs = {
  candidateProfileId: Scalars['Int'];
  recruiterProfileId: Scalars['Int'];
};


export type MutationSetNftAvatarArgs = {
  nftId?: Maybe<Scalars['Int']>;
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInAsUserArgs = {
  email: Scalars['String'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fvType?: Maybe<Scalars['String']>;
  fvSource?: Maybe<Scalars['String']>;
  fvMedium?: Maybe<Scalars['String']>;
  fvCampaign?: Maybe<Scalars['String']>;
  fvContent?: Maybe<Scalars['String']>;
  fvTerm?: Maybe<Scalars['String']>;
  lvType?: Maybe<Scalars['String']>;
  lvSource?: Maybe<Scalars['String']>;
  lvMedium?: Maybe<Scalars['String']>;
  lvCampaign?: Maybe<Scalars['String']>;
  lvContent?: Maybe<Scalars['String']>;
  lvTerm?: Maybe<Scalars['String']>;
  gClientid?: Maybe<Scalars['String']>;
  gIp?: Maybe<Scalars['String']>;
  gAgent?: Maybe<Scalars['String']>;
  gclid?: Maybe<Scalars['String']>;
};


export type MutationSignUpAsInactiveUserArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fvType?: Maybe<Scalars['String']>;
  fvSource?: Maybe<Scalars['String']>;
  fvMedium?: Maybe<Scalars['String']>;
  fvCampaign?: Maybe<Scalars['String']>;
  fvContent?: Maybe<Scalars['String']>;
  fvTerm?: Maybe<Scalars['String']>;
  lvType?: Maybe<Scalars['String']>;
  lvSource?: Maybe<Scalars['String']>;
  lvMedium?: Maybe<Scalars['String']>;
  lvCampaign?: Maybe<Scalars['String']>;
  lvContent?: Maybe<Scalars['String']>;
  lvTerm?: Maybe<Scalars['String']>;
  gClientid?: Maybe<Scalars['String']>;
  gIp?: Maybe<Scalars['String']>;
  gAgent?: Maybe<Scalars['String']>;
  gclid?: Maybe<Scalars['String']>;
};


export type MutationSocialSignUpArgs = {
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fvType?: Maybe<Scalars['String']>;
  fvSource?: Maybe<Scalars['String']>;
  fvMedium?: Maybe<Scalars['String']>;
  fvCampaign?: Maybe<Scalars['String']>;
  fvContent?: Maybe<Scalars['String']>;
  fvTerm?: Maybe<Scalars['String']>;
  lvType?: Maybe<Scalars['String']>;
  lvSource?: Maybe<Scalars['String']>;
  lvMedium?: Maybe<Scalars['String']>;
  lvCampaign?: Maybe<Scalars['String']>;
  lvContent?: Maybe<Scalars['String']>;
  lvTerm?: Maybe<Scalars['String']>;
  gClientid?: Maybe<Scalars['String']>;
  gIp?: Maybe<Scalars['String']>;
  gAgent?: Maybe<Scalars['String']>;
  gclid?: Maybe<Scalars['String']>;
  providerId: Scalars['String'];
  providerName: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};


export type MutationSocialSignUpAsInactiveUserArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fvType?: Maybe<Scalars['String']>;
  fvSource?: Maybe<Scalars['String']>;
  fvMedium?: Maybe<Scalars['String']>;
  fvCampaign?: Maybe<Scalars['String']>;
  fvContent?: Maybe<Scalars['String']>;
  fvTerm?: Maybe<Scalars['String']>;
  lvType?: Maybe<Scalars['String']>;
  lvSource?: Maybe<Scalars['String']>;
  lvMedium?: Maybe<Scalars['String']>;
  lvCampaign?: Maybe<Scalars['String']>;
  lvContent?: Maybe<Scalars['String']>;
  lvTerm?: Maybe<Scalars['String']>;
  gClientid?: Maybe<Scalars['String']>;
  gIp?: Maybe<Scalars['String']>;
  gAgent?: Maybe<Scalars['String']>;
  gclid?: Maybe<Scalars['String']>;
  providerId: Scalars['String'];
  providerName: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};


export type MutationSubscribeToCandidatesSearchArgs = {
  title: Scalars['String'];
  userId?: Maybe<Scalars['Int']>;
  searchParams: PublicProfilesParameters;
};


export type MutationUnarchiveProfileConnectionForUserArgs = {
  id: Scalars['Int'];
};


export type MutationUnregisterDeviceArgs = {
  token: Scalars['String'];
};


export type MutationUnsubscribeFromCandidatesSearchArgs = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationUpdateAdminSettingsArgs = {
  permissions: UpdateAdminSettingsValues;
};


export type MutationUpdateCandidateProfileArgs = {
  position?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['Float']>;
  candidateDescription?: Maybe<Scalars['String']>;
  experienceDescription?: Maybe<Scalars['String']>;
  workExpectations?: Maybe<Scalars['String']>;
  achievements?: Maybe<Scalars['String']>;
  technologiesIds?: Maybe<Array<Scalars['Int']>>;
  jobExperienceId?: Maybe<Scalars['Int']>;
  employmentTypesIds?: Maybe<Array<Scalars['Int']>>;
  employmentLocationsIds?: Maybe<Array<Scalars['Int']>>;
  englishLevelId?: Maybe<Scalars['Int']>;
  specializationId?: Maybe<Scalars['Int']>;
  specializationsIds?: Maybe<Array<Scalars['Int']>>;
  cities?: Maybe<Array<CandidateProfileCityInput>>;
  workPlaces?: Maybe<Array<CandidateProfileWorkPlaceInput>>;
};


export type MutationUpdateConnectionLastActionTimeArgs = {
  id: Scalars['Int'];
  time?: Maybe<Scalars['GraphQLDateTime']>;
};


export type MutationUpdateMessageArgs = {
  id: Scalars['Int'];
  values: UpdateMessageValues;
};


export type MutationUpdateMessageTemplateArgs = {
  id: Scalars['Int'];
  userId?: Maybe<Scalars['Int']>;
  values: UpdateTemplateMessageValues;
};


export type MutationUpdateProfileContactsArgs = {
  phone?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  linkedinUrl?: Maybe<Scalars['String']>;
  behanceUrl?: Maybe<Scalars['String']>;
  githubUrl?: Maybe<Scalars['String']>;
  ethWalletAddress?: Maybe<Scalars['String']>;
};


export type MutationUpdateRecruiterProfileArgs = {
  position?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
};


export type MutationUpdateStatusesNotificationTimeArgs = {
  profileIds: Array<Scalars['Int']>;
};


export type MutationUpdateSubscriptionLastNotifiedArgs = {
  subscriptionsIds?: Maybe<Array<Scalars['Int']>>;
};


export type MutationUpdateSubscriptionLastUsedArgs = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationUpdateSubscriptionTitleArgs = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
  values: UpdateSubscriptionsTitleValues;
};


export type MutationUpdateUserSettingsArgs = {
  pushNotificationsPermission?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateWorkPlaceArgs = {
  id: Scalars['Int'];
  companyName: Scalars['String'];
  companyUrl?: Maybe<Scalars['String']>;
  companySizeFrom?: Maybe<Scalars['Int']>;
  companySizeTo?: Maybe<Scalars['Int']>;
  companyIndustry?: Maybe<Scalars['String']>;
  companyCategories?: Maybe<Scalars['String']>;
  companySpecialities?: Maybe<Scalars['String']>;
  companyFundingType?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
};


export type MutationUploadAvatarArgs = {
  file: Scalars['Upload'];
  size?: Maybe<Scalars['Int']>;
};


export type MutationUploadCvFileArgs = {
  file: Scalars['Upload'];
  size?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  candidateProfileStatusUpdated: CandidateProfile;
  newMessage?: Maybe<ChatMessage>;
  profileConnectionUpdated: ProfileConnection;
  recruiterProfileStatusUpdated: RecruiterProfile;
  userUnreadMessagesCountUpdated?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  adminUser?: Maybe<User>;
  allNfts?: Maybe<Array<Nft>>;
  authUser?: Maybe<User>;
  availableNfts?: Maybe<Array<Nft>>;
  candidateProfileBySlug?: Maybe<CandidateProfile>;
  candidateProfilesBySubscription: Array<CandidateProfile>;
  employmentLocations?: Maybe<Array<EmploymentLocation>>;
  employmentTypes?: Maybe<Array<EmploymentType>>;
  englishLevels?: Maybe<Array<EnglishLevel>>;
  feature?: Maybe<Feature>;
  features?: Maybe<Array<Feature>>;
  hotVacancies?: Maybe<Array<Vacancy>>;
  jobExperiences?: Maybe<Array<JobExperience>>;
  latestActiveCandidateProfile?: Maybe<CandidateProfile>;
  latestCandidateProfile?: Maybe<CandidateProfile>;
  latestRecruiterProfile?: Maybe<RecruiterProfile>;
  latestRecruiterProfileByUserId?: Maybe<RecruiterProfile>;
  perfectCandidatesAmount: Scalars['Int'];
  profileConnection?: Maybe<ProfileConnection>;
  publicCandidateProfiles: PublicCandidateProfilesResult;
  publicRecruiterProfiles: Array<RecruiterProfile>;
  recruiterProfileBySlug?: Maybe<RecruiterProfile>;
  salariesDataByCategory: VacancySalaryData;
  serviceUser?: Maybe<User>;
  specializations?: Maybe<Array<Specialization>>;
  technologies?: Maybe<Array<Technology>>;
  technologiesByNames?: Maybe<Array<Technology>>;
  userByUsername?: Maybe<User>;
  userSearchSubscriptionsByUserId?: Maybe<Array<UsersSearchSubscription>>;
  usersByPendingConnections?: Maybe<Array<User>>;
  usersOAuthProviders?: Maybe<Array<OAuthToken>>;
  usersSearchSubscriptions?: Maybe<Array<UsersSearchSubscription>>;
  usersWithChurnedCandidateProfiles?: Maybe<Array<ChurnedUser>>;
  vacancies: VacanciesResult;
  vacanciesByCompany?: Maybe<Array<Vacancy>>;
  vacanciesSources?: Maybe<Array<VacanciesSource>>;
};


export type QueryCandidateProfileBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryCandidateProfilesBySubscriptionArgs = {
  subscriptionLastInteract: Scalars['GraphQLDateTime'];
  where: PublicProfilesParameters;
};


export type QueryFeatureArgs = {
  name: Scalars['String'];
};


export type QueryLatestActiveCandidateProfileArgs = {
  userId: Scalars['Int'];
};


export type QueryLatestRecruiterProfileByUserIdArgs = {
  userId?: Maybe<Scalars['Int']>;
};


export type QueryPerfectCandidatesAmountArgs = {
  where?: Maybe<PublicProfilesParameters>;
};


export type QueryProfileConnectionArgs = {
  id: Scalars['Int'];
};


export type QueryPublicCandidateProfilesArgs = {
  where?: Maybe<PublicProfilesParameters>;
  options?: Maybe<PublicProfilesOptions>;
};


export type QueryRecruiterProfileBySlugArgs = {
  slug: Scalars['String'];
};


export type QuerySalariesDataByCategoryArgs = {
  keywords?: Maybe<Array<Scalars['String']>>;
};


export type QuerySpecializationsArgs = {
  query?: Maybe<Scalars['String']>;
};


export type QueryTechnologiesArgs = {
  query?: Maybe<Scalars['String']>;
  requiredTechnologiesIds?: Maybe<Array<Scalars['Int']>>;
};


export type QueryTechnologiesByNamesArgs = {
  names: Array<Scalars['String']>;
};


export type QueryUserByUsernameArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QueryUserSearchSubscriptionsByUserIdArgs = {
  userId?: Maybe<Scalars['Int']>;
};


export type QueryVacanciesArgs = {
  options?: Maybe<VacanciesParameters>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryVacanciesByCompanyArgs = {
  options?: Maybe<VacanciesByCompanyParameters>;
};

export type PublicCandidateProfilesResult = {
  __typename?: 'PublicCandidateProfilesResult';
  rows: Array<CandidateProfile>;
  hasMore: Scalars['Boolean'];
  count: Scalars['Int'];
};

export enum CandidateProfileStatus {
  Draft = 'DRAFT',
  OnReview = 'ON_REVIEW',
  Rejected = 'REJECTED',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type CandidateProfile = {
  __typename?: 'CandidateProfile';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  slug?: Maybe<Scalars['String']>;
  status: CandidateProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['Float']>;
  candidateDescription?: Maybe<Scalars['String']>;
  experienceDescription?: Maybe<Scalars['String']>;
  workExpectations?: Maybe<Scalars['String']>;
  achievements?: Maybe<Scalars['String']>;
  specializations?: Maybe<Array<Specialization>>;
  technologies?: Maybe<Array<Technology>>;
  employmentTypes?: Maybe<Array<EmploymentType>>;
  employmentLocations?: Maybe<Array<EmploymentLocation>>;
  englishLevel?: Maybe<EnglishLevel>;
  jobExperience?: Maybe<JobExperience>;
  specialization?: Maybe<Specialization>;
  user?: Maybe<User>;
  cities?: Maybe<Array<CandidateProfileCity>>;
  workPlaces?: Maybe<Array<CandidateProfileWorkPlace>>;
  lastActionTime?: Maybe<Scalars['GraphQLDateTime']>;
  connectionsCount?: Maybe<Scalars['Int']>;
};

export type PublicProfilesOptions = {
  offset?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  forceRealList?: Maybe<Scalars['Boolean']>;
};

export type PublicProfilesParameters = {
  cities?: Maybe<Array<Scalars['String']>>;
  countries?: Maybe<Array<Scalars['String']>>;
  locations?: Maybe<Array<Scalars['String']>>;
  specializations?: Maybe<Array<Scalars['String']>>;
  salaryFrom?: Maybe<Scalars['Int']>;
  salaryTo?: Maybe<Scalars['Int']>;
  timezoneFrom?: Maybe<Scalars['Int']>;
  timezoneTo?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
  experienceIds?: Maybe<Array<Scalars['Int']>>;
  englishLevelIds?: Maybe<Array<Scalars['Int']>>;
  employmentTypesIds?: Maybe<Array<Scalars['Int']>>;
  technologiesIds?: Maybe<Array<Scalars['Int']>>;
  timezoneReverseMode?: Maybe<Scalars['Boolean']>;
};

export type CandidateProfileCityInput = {
  cityId: Scalars['String'];
  cityName: Scalars['String'];
  cityTimezone?: Maybe<Scalars['Int']>;
  cityCountrySlug?: Maybe<Scalars['String']>;
  cityCountryName?: Maybe<Scalars['String']>;
  type?: Maybe<CityTypes>;
};

export type CandidateProfileCity = {
  __typename?: 'CandidateProfileCity';
  id: Scalars['Int'];
  cityId: Scalars['String'];
  cityName: Scalars['String'];
  cityTimezone?: Maybe<Scalars['Int']>;
  cityCountrySlug?: Maybe<Scalars['String']>;
  cityCountryName?: Maybe<Scalars['String']>;
  type: CityTypes;
};

export enum CityTypes {
  CandidateCity = 'CANDIDATE_CITY',
  OfficeCity = 'OFFICE_CITY'
}

export type UpdateMessageValues = {
  message: Scalars['String'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  id: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  senderUser?: Maybe<User>;
  recipientUser?: Maybe<User>;
  profileConnectionId: Scalars['Int'];
  isSystemMessage?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['GraphQLDateTime'];
  updatedAt: Scalars['GraphQLDateTime'];
};

export enum MessageUserRole {
  Sender = 'SENDER',
  Recipient = 'RECIPIENT',
  NotDefined = 'NOT_DEFINED'
}


export enum DevicePlatform {
  Ios = 'IOS',
  Android = 'ANDROID'
}

export type DeviceToken = {
  __typename?: 'DeviceToken';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  token: Scalars['String'];
  devicePlatform: DevicePlatform;
  deviceYear?: Maybe<Scalars['String']>;
  systemVersion?: Maybe<Scalars['String']>;
  deviceName?: Maybe<Scalars['String']>;
};

export type EmploymentLocation = {
  __typename?: 'EmploymentLocation';
  id: Scalars['Int'];
  slug: Scalars['String'];
};

export type EmploymentType = {
  __typename?: 'EmploymentType';
  id: Scalars['Int'];
  slug: Scalars['String'];
};

export type EnglishLevel = {
  __typename?: 'EnglishLevel';
  id: Scalars['Int'];
  slug: Scalars['String'];
};

export type Feature = {
  __typename?: 'Feature';
  id: Scalars['Int'];
  name: Scalars['String'];
  status: FeatureStatus;
};

export enum FeatureStatus {
  Enabled = 'ENABLED',
  Disabled = 'DISABLED'
}

export type JobExperience = {
  __typename?: 'JobExperience';
  id: Scalars['Int'];
  slug: Scalars['String'];
};

export type Nft = {
  __typename?: 'Nft';
  id: Scalars['Int'];
  openseaUrl: Scalars['String'];
  userId?: Maybe<Scalars['Int']>;
  entity: UploadedFile;
};

export enum NotificationChannel {
  Push = 'PUSH'
}

export enum OAuthProviders {
  Github = 'GITHUB',
  Google = 'GOOGLE',
  Linkedin = 'LINKEDIN',
  Apple = 'APPLE'
}

export type OAuthToken = {
  __typename?: 'OAuthToken';
  id: Scalars['Int'];
  providerName: Scalars['String'];
  providerId: Scalars['String'];
  token: Scalars['String'];
};

export type ProfileConnection = {
  __typename?: 'ProfileConnection';
  id: Scalars['Int'];
  candidateUser?: Maybe<User>;
  recruiterUser: User;
  candidateProfile: CandidateProfile;
  recruiterProfile: RecruiterProfile;
  initiator: ProfileConnectionInitiator;
  status: ProfileConnectionStatus;
  chatMessages?: Maybe<Array<ChatMessage>>;
  candidateReportedStatus?: Maybe<OfferStatus>;
  recruiterReportedStatus?: Maybe<OfferStatus>;
  userMeta?: Maybe<ProfileConnectionUserMeta>;
  buddyMeta?: Maybe<ProfileConnectionUserMeta>;
  candidateReportedAt?: Maybe<Scalars['GraphQLDateTime']>;
  recruiterReportedAt?: Maybe<Scalars['GraphQLDateTime']>;
  unreadMessagesCount?: Maybe<Scalars['Int']>;
  paidAt?: Maybe<Scalars['GraphQLDateTime']>;
  isPaymentRequested: Scalars['Boolean'];
};

export enum ProfileConnectionInitiator {
  Candidate = 'CANDIDATE',
  Recruiter = 'RECRUITER'
}

export enum ProfileConnectionStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

export enum OfferStatus {
  Offer = 'OFFER',
  NoOffer = 'NO_OFFER'
}

export type ProfileConnectionUserMeta = {
  __typename?: 'ProfileConnectionUserMeta';
  id: Scalars['Int'];
  lastActionTime?: Maybe<Scalars['GraphQLDateTime']>;
  archivedAt?: Maybe<Scalars['GraphQLDateTime']>;
};

export enum RecruiterProfileStatus {
  Draft = 'DRAFT',
  OnReview = 'ON_REVIEW',
  Rejected = 'REJECTED',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type RecruiterProfile = {
  __typename?: 'RecruiterProfile';
  id: Scalars['Int'];
  slug?: Maybe<Scalars['String']>;
  status: RecruiterProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  lastActionTime?: Maybe<Scalars['GraphQLDateTime']>;
  statusesNotificationSentAt?: Maybe<Scalars['GraphQLDateTime']>;
  activeConnectionWithCandidate?: Maybe<ProfileConnection>;
};


export type RecruiterProfileActiveConnectionWithCandidateArgs = {
  candidateProfileId: Scalars['Int'];
};

export type ReportOfferStatusValues = {
  profileConnectionId: Scalars['Int'];
  status: OfferStatus;
};

export type Specialization = {
  __typename?: 'Specialization';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Technology = {
  __typename?: 'Technology';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UploadedFile = {
  __typename?: 'UploadedFile';
  id: Scalars['Int'];
  name: Scalars['String'];
  mime: Scalars['String'];
  url: Scalars['String'];
};

export enum PrimaryProfile {
  Recruiter = 'RECRUITER',
  Candidate = 'CANDIDATE',
  NotDefined = 'NOT_DEFINED'
}

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN'
}

export type ChurnedUser = {
  __typename?: 'ChurnedUser';
  id: Scalars['Int'];
  firstName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  profilesCount: Scalars['Int'];
  profileId: Scalars['Int'];
  slug?: Maybe<Scalars['String']>;
  profileCreatedAt: Scalars['GraphQLDateTime'];
};

export type User = {
  __typename?: 'User';
  adminSettings?: Maybe<AdminSettings>;
  avatar?: Maybe<UploadedFile>;
  behanceUrl?: Maybe<Scalars['String']>;
  computedName?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created?: Maybe<Scalars['Boolean']>;
  cv?: Maybe<UploadedFile>;
  email?: Maybe<Scalars['String']>;
  ethWalletAddress?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fvCampaign?: Maybe<Scalars['String']>;
  fvContent?: Maybe<Scalars['String']>;
  fvMedium?: Maybe<Scalars['String']>;
  fvSource?: Maybe<Scalars['String']>;
  fvTerm?: Maybe<Scalars['String']>;
  fvType?: Maybe<Scalars['String']>;
  gAgent?: Maybe<Scalars['String']>;
  gClientid?: Maybe<Scalars['String']>;
  gIp?: Maybe<Scalars['String']>;
  gclid?: Maybe<Scalars['String']>;
  githubUrl?: Maybe<Scalars['String']>;
  hasVacanciesSource?: Maybe<Scalars['Boolean']>;
  hires?: Maybe<Array<ProfileConnection>>;
  id: Scalars['Int'];
  inactive?: Maybe<Scalars['Boolean']>;
  isAdminUser?: Maybe<Scalars['Boolean']>;
  isAuthUser?: Maybe<Scalars['Boolean']>;
  isFirstTimeFillingCandidateProfile?: Maybe<Scalars['Boolean']>;
  isFirstTimeFillingRecruiterProfile?: Maybe<Scalars['Boolean']>;
  lastActionTime?: Maybe<Scalars['GraphQLDateTime']>;
  lastName?: Maybe<Scalars['String']>;
  linkedinUrl?: Maybe<Scalars['String']>;
  lvCampaign?: Maybe<Scalars['String']>;
  lvContent?: Maybe<Scalars['String']>;
  lvMedium?: Maybe<Scalars['String']>;
  lvSource?: Maybe<Scalars['String']>;
  lvTerm?: Maybe<Scalars['String']>;
  lvType?: Maybe<Scalars['String']>;
  messageTemplates?: Maybe<Array<UserTemplateMessage>>;
  nfts?: Maybe<Array<Nft>>;
  phone?: Maybe<Scalars['String']>;
  primaryProfile?: Maybe<PrimaryProfile>;
  profileConnections?: Maybe<Array<ProfileConnection>>;
  recruiterProfiles?: Maybe<Array<RecruiterProfile>>;
  searchSubscriptions?: Maybe<Array<UsersSearchSubscription>>;
  settings?: Maybe<UserSettings>;
  unreadMessagesCount?: Maybe<Scalars['Int']>;
  userRole?: Maybe<UserRole>;
  username?: Maybe<Scalars['String']>;
};


export type UserMessageTemplatesArgs = {
  messageType: PrimaryProfile;
};


export type UserProfileConnectionsArgs = {
  archived?: Maybe<Scalars['Boolean']>;
};

export type UserTemplateMessage = {
  __typename?: 'UserTemplateMessage';
  id: Scalars['Int'];
  messageType?: Maybe<PrimaryProfile>;
  messageTitle: Scalars['String'];
  messageBody: Scalars['String'];
  createdAt?: Maybe<Scalars['GraphQLDateTime']>;
};

export type UpdateTemplateMessageValues = {
  messageTitle?: Maybe<Scalars['String']>;
  messageBody?: Maybe<Scalars['String']>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  pushNotificationsPermission: Scalars['Boolean'];
};

export type UsersSearchSubscription = {
  __typename?: 'UsersSearchSubscription';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  title: Scalars['String'];
  lastUsed: Scalars['GraphQLDateTime'];
  lastNotified?: Maybe<Scalars['GraphQLDateTime']>;
  searchParams: CandidatesSearchParams;
  stringifiedSearchParams: SubscriptionStringifiedParams;
  user?: Maybe<User>;
  subscriptionUrl: Scalars['String'];
};

export type UpdateSubscriptionsTitleValues = {
  title: Scalars['String'];
};

export type SubscriptionStringifiedParams = {
  __typename?: 'SubscriptionStringifiedParams';
  id: Scalars['Int'];
  employmentTypes?: Maybe<Array<EmploymentType>>;
  technologies?: Maybe<Array<Technology>>;
  jobExperiences?: Maybe<Array<JobExperience>>;
  englishLevels?: Maybe<Array<EnglishLevel>>;
};

export type CandidatesSearchParams = {
  __typename?: 'CandidatesSearchParams';
  cities?: Maybe<Array<Scalars['String']>>;
  countries?: Maybe<Array<Scalars['String']>>;
  specializations?: Maybe<Array<Scalars['String']>>;
  salaryFrom?: Maybe<Scalars['Int']>;
  salaryTo?: Maybe<Scalars['Int']>;
  timezoneFrom?: Maybe<Scalars['Int']>;
  timezoneTo?: Maybe<Scalars['Int']>;
  timezoneReverseMode?: Maybe<Scalars['Boolean']>;
  searchQuery?: Maybe<Scalars['String']>;
  experienceIds?: Maybe<Array<Scalars['Int']>>;
  englishLevelIds?: Maybe<Array<Scalars['Int']>>;
  employmentTypesIds?: Maybe<Array<Scalars['Int']>>;
  technologiesIds?: Maybe<Array<Scalars['Int']>>;
};

export enum VacancySourceType {
  Lever = 'LEVER',
  Greenhouse = 'GREENHOUSE'
}

export type VacanciesSource = {
  __typename?: 'VacanciesSource';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  url: Scalars['String'];
  createdAt: Scalars['GraphQLDateTime'];
  deletedAt?: Maybe<Scalars['GraphQLDateTime']>;
};

export type CreateMultipleVacanciesSourcesParameters = {
  atsIds: Scalars['String'];
  companyNames: Scalars['String'];
  salaryRanges: Scalars['String'];
  type: VacancySourceType;
};

export type VacanciesResult = {
  __typename?: 'VacanciesResult';
  rows: Array<Vacancy>;
  hasMore: Scalars['Boolean'];
};

export enum VacancyStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum VacancyType {
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME'
}

export type VacancySalaryData = {
  __typename?: 'VacancySalaryData';
  maxSalary: Scalars['Int'];
  averageMinSalary: Scalars['Int'];
  averageSalary: Scalars['Int'];
};

export type VacancyData = {
  __typename?: 'VacancyData';
  vacancies: Array<Vacancy>;
  salaryData: VacancySalaryData;
  hasMore: Scalars['Boolean'];
};

export type VacanciesParameters = {
  keywords?: Maybe<Array<Scalars['String']>>;
};

export type VacanciesByCompanyParameters = {
  companyName: Scalars['String'];
};

export type SourcedVacancy = {
  sourceId: Scalars['Int'];
  userId: Scalars['Int'];
  applyLink: Scalars['String'];
  jobTitle: Scalars['String'];
  jobDescription: Scalars['String'];
  jobType: VacancyType;
  jobCategory: VacancyCategory;
  status: VacancyStatus;
  companyName: Scalars['String'];
  salaryFrom?: Maybe<Scalars['Float']>;
  salaryTo?: Maybe<Scalars['Float']>;
};

export enum VacancyCategory {
  UsOnly = 'US_ONLY',
  EuropeOnly = 'EUROPE_ONLY',
  Worldwide = 'WORLDWIDE'
}

export type Vacancy = {
  __typename?: 'Vacancy';
  id: Scalars['Int'];
  status: VacancyStatus;
  companyName: Scalars['String'];
  jobTitle: Scalars['String'];
  salaryTo?: Maybe<Scalars['Float']>;
  salaryFrom?: Maybe<Scalars['Float']>;
  jobDescription?: Maybe<Scalars['String']>;
  jobType: VacancyType;
  jobCategory: VacancyCategory;
  englishLevel?: Maybe<EnglishLevel>;
  jobExperience?: Maybe<JobExperience>;
  technologies?: Maybe<Array<Technology>>;
  specializations?: Maybe<Array<Specialization>>;
  createdAt?: Maybe<Scalars['GraphQLDateTime']>;
  updatedAt?: Maybe<Scalars['GraphQLDateTime']>;
  companyLogo?: Maybe<UploadedFile>;
  isTop: Scalars['Boolean'];
  sourceId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  applyLink?: Maybe<Scalars['String']>;
};

export type CandidateProfileWorkPlace = {
  __typename?: 'CandidateProfileWorkPlace';
  id: Scalars['Int'];
  companyName: Scalars['String'];
  companyUrl?: Maybe<Scalars['String']>;
  companySizeFrom?: Maybe<Scalars['Int']>;
  companySizeTo?: Maybe<Scalars['Int']>;
  companyIndustry?: Maybe<Scalars['String']>;
  companyCategories?: Maybe<Scalars['String']>;
  companySpecialities?: Maybe<Scalars['String']>;
  companyFundingType?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  startDate: Scalars['GraphQLDateTime'];
  endDate?: Maybe<Scalars['GraphQLDateTime']>;
};

export type CandidateProfileWorkPlaceInput = {
  companyName: Scalars['String'];
  companyUrl?: Maybe<Scalars['String']>;
  companySizeFrom?: Maybe<Scalars['Int']>;
  companySizeTo?: Maybe<Scalars['Int']>;
  companyIndustry?: Maybe<Scalars['String']>;
  companyCategories?: Maybe<Scalars['String']>;
  companySpecialities?: Maybe<Scalars['String']>;
  companyFundingType?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  startDate: Scalars['GraphQLDateTime'];
  endDate?: Maybe<Scalars['GraphQLDateTime']>;
};


export type ReviewCandidateProfileMutationVariables = Exact<{
  id: Scalars['Int'];
  status: CandidateProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
}>;


export type ReviewCandidateProfileMutation = (
  { __typename?: 'Mutation' }
  & { reviewCandidateProfile: (
    { __typename?: 'CandidateProfile' }
    & Pick<CandidateProfile, 'id' | 'status'>
  ) }
);

export type ReviewRecruiterProfileMutationVariables = Exact<{
  id: Scalars['Int'];
  status: RecruiterProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
}>;


export type ReviewRecruiterProfileMutation = (
  { __typename?: 'Mutation' }
  & { reviewRecruiterProfile: (
    { __typename?: 'RecruiterProfile' }
    & Pick<RecruiterProfile, 'id' | 'status'>
  ) }
);


export const ReviewCandidateProfileDocument = /*#__PURE__*/ gql`
    mutation reviewCandidateProfile($id: Int!, $status: CandidateProfileStatus!, $rejectReason: String) {
  reviewCandidateProfile(id: $id, status: $status, rejectReason: $rejectReason) {
    id
    status
  }
}
    `;
export const ReviewRecruiterProfileDocument = /*#__PURE__*/ gql`
    mutation reviewRecruiterProfile($id: Int!, $status: RecruiterProfileStatus!, $rejectReason: String) {
  reviewRecruiterProfile(id: $id, status: $status, rejectReason: $rejectReason) {
    id
    status
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    reviewCandidateProfile(variables: ReviewCandidateProfileMutationVariables): Promise<ReviewCandidateProfileMutation> {
      return withWrapper(() => client.request<ReviewCandidateProfileMutation>(print(ReviewCandidateProfileDocument), variables));
    },
    reviewRecruiterProfile(variables: ReviewRecruiterProfileMutationVariables): Promise<ReviewRecruiterProfileMutation> {
      return withWrapper(() => client.request<ReviewRecruiterProfileMutation>(print(ReviewRecruiterProfileDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;