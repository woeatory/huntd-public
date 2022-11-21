import { postMessageResolver } from '@/controllers/apollo/apollo.localStore/modules/flashMessage/flashMessage.resolvers/postMessage.resolver';
import { deleteMessageResolver } from '@/controllers/apollo/apollo.localStore/modules/flashMessage/flashMessage.resolvers/deleteMessage.resolver';

export const FlashMessageResolvers = {
  Mutation: {
    postMessage: postMessageResolver,
    deleteMessage: deleteMessageResolver,
  },
};
