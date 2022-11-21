import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';
import { makeSubscription } from '@/core';
import { ChatMessageEvents } from '@/modules/chatMessage/chatMessage.constants';
import { isUserAuthenticatedGuard } from '@/modules/user/user.guards/isUserAuthenticated.guard';
import { ChatMessage } from '@/models/ChatMessage';

export interface NewMessageSubscriptionPayload {
  newMessage: ChatMessage
}

export const newMessageResolver = combineResolvers(
  isUserAuthenticatedGuard,
  makeSubscription<NewMessageSubscriptionPayload>(
    ChatMessageEvents.NewChatMessageSent,
    async (
      payload,
      args,
      ctx,
    ) => {
      const profileConnection = await ctx.models.ProfileConnection.findOne({
        where: {
          id: payload.newMessage.profileConnectionId,
          [Op.or]: [
            { candidateUserId: Number(ctx.authUser?.id) },
            { recruiterUserId: Number(ctx.authUser?.id) },
          ],
        },
      });

      return !!profileConnection;
    },
  ),
);
