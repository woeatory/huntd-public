import gql from 'graphql-tag';

export const USER_ENGAGEMENT_FIELDS_FRAGMENT = gql`
  fragment UserEngagementFields on User {
    fvType
    fvSource
    fvMedium
    fvCampaign
    fvContent
    fvTerm
    lvType
    lvSource
    lvMedium
    lvCampaign
    lvContent
    lvTerm
    gClientid
    gIp
    gAgent
    gclid
  }
`;
