import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import { makeAuthResolver } from '@/core';
import {
  UpdateTemplateMessageUseCase,
  UpdateTemplateMessageUseCaseOptions,
  UpdateTemplateMessageUseCaseResult,
} from '@/modules/userMessagesTemplate/userMessagesTemplate.useCases/UpdateMessageTemplate.useCase';

export const updateMessageTemplateResolver = makeAuthResolver<
  UpdateTemplateMessageUseCaseOptions & {userId: number},
  UpdateTemplateMessageUseCaseResult,
  UpdateTemplateMessageUseCaseOptions
>(
  UpdateTemplateMessageUseCase,
  (args) => ({
    id: args.id,
    values: args.values,
  }),
  [
    (parent, args, ctx) => {
      if (ctx.authUser?.id === args.userId || ctx?.authUser?.isAdminUser) {
        return skip;
      }

      throw new ForbiddenError('forbidden');
    },
  ],
);
