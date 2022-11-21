import gql from 'graphql-tag';

export const PROFILE_CONNECTION_BASE_FRAGMENT = gql`
  fragment ProfileConnectionBase on ProfileConnection {
    id
    status
    initiator
    candidateReportedStatus
    recruiterReportedStatus
    candidateReportedAt
    recruiterReportedAt
    paidAt
    isPaymentRequested
  }
`;
