import { ResolverFn } from '@/controllers/apollo/apollo.typedefs';
import {
  FlashMessage, FlashMessageBaseFragment, FlashMessageBaseFragmentDoc,
  PostMessageMutationVariables,
} from '@/controllers/graphql/generated';

type Options = PostMessageMutationVariables;
type Result = number;

let id = 0;

export const postMessageResolver: ResolverFn<Args, Result> = async (
  parent,
  options,
  { cache },
) => {
  const message = {
    ...options,
    cta: options.cta || null,
    id,
    __typename: <const> 'FlashMessage',
  };

  const fragment = cache.writeFragment<FlashMessageBaseFragment>({
    id: `FlashMessage:${id}`,
    fragment: FlashMessageBaseFragmentDoc,
    data: message,
  });

  cache.modify({
    id: 'ROOT_QUERY',
    fields: {
      visibleMessages(values: FlashMessage[]) {
        return [
          ...values,
          fragment,
        ];
      },
    },
  });

  id += 1;

  return message.id;
};
