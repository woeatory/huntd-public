import { ResolverFn } from '@/controllers/apollo/apollo.typedefs';
import {
  DeleteMessageMutationVariables,
  FlashMessage,
} from '@/controllers/graphql/generated';

type Options = DeleteMessageMutationVariables;
type Result = number;

export const deleteMessageResolver: ResolverFn<Args, Result> = async (
  parent,
  options,
  { cache },
) => {
  cache.modify({
    id: `ROOT_QUERY`,
    fields: {
      visibleMessages(messages: FlashMessage[], { readField }) {
        return messages.filter((message) => readField('id', message) !== options.id);
      },
    },
  });

  return options.id;
};
