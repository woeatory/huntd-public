import gql from 'graphql-tag';

export const WorkPlaceSchema = gql`
  extend type Mutation {
    fetchWorkPlaces(
      linkedinUrl: String!
      candidateProfileId: Int!
      liveScrape: Boolean
    ): [CandidateProfileWorkPlace!]
    createWorkPlace(
      candidateProfileId: Int!
      companyName: String!
      companyUrl: String
      companySizeFrom: Int
      companySizeTo: Int
      companyIndustry: String
      companyCategories: String
      companySpecialities: String
      companyFundingType: String
      title: String!
      description: String
      startDate: String!
      endDate: String
    ): CandidateProfileWorkPlace!
    updateWorkPlace(
      id: Int!
      companyName: String!
      companyUrl: String
      companySizeFrom: Int
      companySizeTo: Int
      companyIndustry: String
      companyCategories: String
      companySpecialities: String
      companyFundingType: String
      title: String
      description: String
      startDate: String
      endDate: String
    ): CandidateProfileWorkPlace!
    deleteWorkPlace(
      id: Int!
    ): Boolean!

  }

  type CandidateProfileWorkPlace {
    id: Int!
    companyName: String!
    companyUrl: String
    companySizeFrom: Int
    companySizeTo: Int
    companyIndustry: String
    companyCategories: String
    companySpecialities: String
    companyFundingType: String
    title: String!
    description: String
    startDate: GraphQLDateTime!
    endDate: GraphQLDateTime
  }

  input CandidateProfileWorkPlaceInput {
    companyName: String!
    companyUrl: String
    companySizeFrom: Int
    companySizeTo: Int
    companyIndustry: String
    companyCategories: String
    companySpecialities: String
    companyFundingType: String
    title: String!
    description: String
    startDate: GraphQLDateTime!
    endDate: GraphQLDateTime
  }
`;
