import gql from 'graphql-tag';

export const BULK_REPORT_OFFER_STATUS_MUTATION = gql`
  mutation bulkReportOfferStatus(
    $values: [ReportOfferStatusValues!]!
  ) {
    bulkReportOfferStatus(
      values: $values
    )
  }
`;
