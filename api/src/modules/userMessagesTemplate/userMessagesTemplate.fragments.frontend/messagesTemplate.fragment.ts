import gql from 'graphql-tag';

export const MESSAGE_TEMPLATE_BASE_FRAGMENT = gql`
  fragment MessageTemplateBase on UserTemplateMessage {
    id
    messageType
    messageTitle
    messageBody
  }
`;
