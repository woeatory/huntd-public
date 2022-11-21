import gql from 'graphql-tag';

export const BULK_SEND_MESSAGE_MUTATION = gql`
  mutation bulkSendMessage(
    $recruiterProfileId: Int!
    $candidateProfileIds: [Int!]!
    $message: String!
  ) {
    bulkSendMessage(
      recruiterProfileId: $recruiterProfileId
      candidateProfileIds: $candidateProfileIds
      message: $message
    )
  }
`;
