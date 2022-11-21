import { idX } from '@mate-academy/core';
import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import { makeAuthResolver } from '@/core';
import {
  CreateTemplateMessageUseCase,
  CreateTemplateMessageUseCaseOptions,
  CreateTemplateMessageUseCaseResult,
} from '@/modules/userMessagesTemplate/userMessagesTemplate.useCases/CreateTemplateMessage.useCase';

export const createMessageTemplateResolver = makeAuthResolver<
  CreateTemplateMessageUseCaseOptions,
  CreateTemplateMessageUseCaseResult
>(
  CreateTemplateMessageUseCase,
  idX,
  [
    (parent, args, ctx) => {
      if (ctx.authUser?.id === args.userId || ctx?.authUser?.isAdminUser) {
        return skip;
      }

      throw new ForbiddenError('forbidden');
    },
  ],
);
