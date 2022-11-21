import merge from 'lodash/merge';
import { GraphQLDateTime } from 'graphql-iso-date';
import { GraphQLUpload } from 'apollo-server-express';
import { UserResolvers } from '@/modules/user/user.resolvers';
import { CandidateProfileResolvers } from '@/modules/candidateProfile/candidateProfile.resolvers';
import { RecruiterProfileResolvers } from '@/modules/recruiterProfile/recruiterProfile.resolvers';
import { OAuthResolvers } from '@/modules/oauth/oauth.resolvers';
import { ProfileConnectionResolvers } from '@/modules/profileConnection/profileConnection.resolvers';
import { ChatMessageResolvers } from '@/modules/chatMessage/chatMessage.resolvers';
import { TechnologyResolvers } from '@/modules/technology/technology.resolvers';
import { SpecializationResolvers } from '@/modules/specialization/specialization.resolvers';
import { JobExperienceResolvers } from '@/modules/jobExperience/jobExperience.resolvers';
import { EnglishLevelResolvers } from '@/modules/englishLevel/englishLevel.resolvers';
import { EmploymentTypeResolvers } from '@/modules/employmentType/employmentType.resolvers';
import { ProfileConnectionUserMetaResolvers } from '@/modules/profileConnectionUserMeta/profileConnectionUserMeta.resolvers';
import { EmploymentLocationResolvers } from '@/modules/employmentLocation/employmentLocation.resolvers';
import { MessageTemplateResolvers } from '@/modules/userMessagesTemplate/userMessagesTemplate.resolvers';
import { UsersSearchSubscriptionResolvers } from '@/modules/usersSearchSubscription/usersSearchSubscription.resolvers';
import { FeatureResolvers } from '@/modules/feature/feature.resolvers';
import { DeviceTokenResolvers } from '@/modules/deviceToken/deviceToken.resolvers';
import { VacancyResolvers } from '@/modules/vacancy/vacancy.resolvers';
import { UserSettingsResolvers } from '@/modules/userSettings/userSettings.resolvers';
import { AdminSettingsResolvers } from '@/modules/adminSettings/adminSettings.resolvers';
import { NotificationsResolvers } from '@/modules/notifications/notifications.resolvers';
import { VacanciesSourceResolvers } from '@/modules/vacanciesSource/vacanciesSource.resolvers';
import { FeedbacksResolvers } from '@/modules/feedbacks/feedbacks.resolvers';
import { WorkPlaceResolvers } from '@/modules/workPlace/workPlace.resolvers';
import { PaymentsResolvers } from '@/modules/payments/payments.resolvers';
import { NftResolvers } from '@/modules/nft/nft.resolvers';

const ScalarResolvers = {
  GraphQLDateTime,
  Upload: GraphQLUpload,
};

const ModulesResolvers = [
  UserResolvers,
  CandidateProfileResolvers,
  RecruiterProfileResolvers,
  OAuthResolvers,
  ProfileConnectionResolvers,
  ChatMessageResolvers,
  TechnologyResolvers,
  SpecializationResolvers,
  JobExperienceResolvers,
  EnglishLevelResolvers,
  EmploymentTypeResolvers,
  ProfileConnectionUserMetaResolvers,
  EmploymentLocationResolvers,
  MessageTemplateResolvers,
  UsersSearchSubscriptionResolvers,
  FeatureResolvers,
  DeviceTokenResolvers,
  VacancyResolvers,
  UserSettingsResolvers,
  AdminSettingsResolvers,
  VacanciesSourceResolvers,
  NotificationsResolvers,
  FeedbacksResolvers,
  WorkPlaceResolvers,
  PaymentsResolvers,
  NftResolvers,
];

export const resolvers = merge(
  ScalarResolvers,
  ...ModulesResolvers,
);
