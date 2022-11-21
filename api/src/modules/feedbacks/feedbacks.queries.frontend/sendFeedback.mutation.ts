import gql from 'graphql-tag';

export const SEND_FEEDBACK_MUTATION = gql`
  mutation sendFeedback(
    $title: String!
    $body: String!
  ) {
    sendFeedback(
      title: $title
      body: $body
    )
  }
`;
