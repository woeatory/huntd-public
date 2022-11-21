import { gql } from '@apollo/client';

export const POST_MESSAGE_MUTATION = gql`
  mutation postMessage(
   $type: FlashMessageType!
   $heading: String!
   $text: String!
   $cta: CtaInput
  ) {
    postMessage(
      type: $type
      heading: $heading
      text: $text
      cta: $cta
    ) @client
  }
`;
