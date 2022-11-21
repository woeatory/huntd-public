import gql from 'graphql-tag';

export const OAuthSchema = gql`
  enum OAuthProviders {
    GITHUB
    GOOGLE
    LINKEDIN
    APPLE
  }

  extend type Query {
    usersOAuthProviders: [OAuthToken!]
  }

  extend type Mutation {
    socialSignUp(
      email: String!,
      phone: String,
      firstName: String,
      lastName: String,
      fvType: String,
      fvSource: String,
      fvMedium: String,
      fvCampaign: String,
      fvContent: String,
      fvTerm: String,
      lvType: String,
      lvSource: String,
      lvMedium: String,
      lvCampaign: String,
      lvContent: String,
      lvTerm: String,
      gClientid: String,
      gIp: String,
      gAgent: String,
      gclid: String,
      providerId: String!,
      providerName: String!,
      token: String,
    ): User!
    socialSignUpAsInactiveUser(
      username: String!
      email: String!,
      phone: String,
      firstName: String,
      lastName: String,
      fvType: String,
      fvSource: String,
      fvMedium: String,
      fvCampaign: String,
      fvContent: String,
      fvTerm: String,
      lvType: String,
      lvSource: String,
      lvMedium: String,
      lvCampaign: String,
      lvContent: String,
      lvTerm: String,
      gClientid: String,
      gIp: String,
      gAgent: String,
      gclid: String,
      providerId: String!,
      providerName: String!,
      token: String,
    ): User!
    connectOAuthProvider(provider: OAuthProviders!, token: String!, id: String!): Boolean!
    disconnectOAuthProvider(provider: OAuthProviders!): Boolean!
  }

  type OAuthToken {
    id: Int!,
    providerName: String!,
    providerId: String!,
    token: String!,
  }
`;
