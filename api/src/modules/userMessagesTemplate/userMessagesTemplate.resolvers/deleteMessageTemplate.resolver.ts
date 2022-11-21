import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import { makeAuthResolver } from '@/core';
import {
  DeleteTemplateMessageUseCase,
  DeleteTemplateMessageUseCaseOptions,
  DeleteTemplateMessageUseCaseResult,
} from '@/modules/userMessagesTemplate/userMessagesTemplate.useCases/DeleteMessageTemplate.useCase';

export const deleteMessageTemplateResolver = makeAuthResolver<
  DeleteTemplateMessageUseCaseOptions & {userId: number},
  DeleteTemplateMessageUseCaseResult,
  DeleteTemplateMessageUseCaseOptions
>(
  DeleteTemplateMessageUseCase,
  (args) => ({
    id: args.id,
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
