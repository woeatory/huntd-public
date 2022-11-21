import gql from 'graphql-tag';

export const SEND_CONFIRM_EMAIL_LINK_MUTATION = gql`
  mutation sendConfirmEmailLink {
    sendConfirmEmailLink
  }
`;
