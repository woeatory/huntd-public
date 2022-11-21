import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import { makeAuthResolver } from '@/core';
import {
  GetTemplateMessagesUseCase,
  GetTemplateMessagesUseCaseOptions,
  GetTemplateMessagesUseCaseResult,
} from '@/modules/user/user.useCases/GetUserMessageTemplates.useCase';
import { User } from '@/models/User';
import { MessageTypeEnum } from '@/modules/userMessagesTemplate/userMessagesTemplate.typedefs';

export const userMessageTemplatesResolver = makeAuthResolver<
  { messageType: MessageTypeEnum},
  GetTemplateMessagesUseCaseResult,
  GetTemplateMessagesUseCaseOptions,
  User
>(
  GetTemplateMessagesUseCase,
  (args, user) => ({
    userId: user.id,
    messageType: args.messageType,
  }),
  [
    (parent, args, ctx) => {
      if (ctx.authUser?.id === parent.id || ctx?.authUser?.isAdminUser) {
        return skip;
      }

      throw new ForbiddenError('forbidden');
    },
  ],
);
