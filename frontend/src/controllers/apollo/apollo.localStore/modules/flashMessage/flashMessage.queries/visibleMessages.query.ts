import { gql } from '@apollo/client';

export const VISIBLE_MESSAGES_QUERY = gql`
  query visibleMessages {
    visibleMessages @client {
      id
      type
      heading
      text
      cta {
        title,
        link
      }
    }
  }
`;
