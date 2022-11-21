import { InMemoryCache } from '@apollo/client';
import {
  VisibleMessagesDocument,
  VisibleMessagesQuery,
} from '@/controllers/graphql/generated';

export const setInitialState = (cache: InMemoryCache) => {
  cache.writeQuery<VisibleMessagesQuery>({
    query: VisibleMessagesDocument,
    data: {
      visibleMessages: [],
    },
  });
};
