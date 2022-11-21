import { gql } from '@apollo/client';

export const FLASH_MESSAGE_BASE_FRAGMENT = gql`
  fragment FlashMessageBase on FlashMessage {
    id
    type
    heading
    text
    cta {
      title,
      link
    }
  }
`;
