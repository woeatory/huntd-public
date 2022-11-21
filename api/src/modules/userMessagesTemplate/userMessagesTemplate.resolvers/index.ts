import { createMessageTemplateResolver } from '@/modules/userMessagesTemplate/userMessagesTemplate.resolvers/createMessageTemplate.resolver';
import { deleteMessageTemplateResolver } from '@/modules/userMessagesTemplate/userMessagesTemplate.resolvers/deleteMessageTemplate.resolver';
import { updateMessageTemplateResolver } from '@/modules/userMessagesTemplate/userMessagesTemplate.resolvers/updateMessageTemplate.resolver';

export const MessageTemplateResolvers = {
  Mutation: {
    createMessageTemplate: createMessageTemplateResolver,
    deleteMessageTemplate: deleteMessageTemplateResolver,
    updateMessageTemplate: updateMessageTemplateResolver,
  },
};
