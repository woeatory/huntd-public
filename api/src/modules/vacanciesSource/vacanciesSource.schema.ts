import gql from 'graphql-tag';

export const VacanciesSourceSchema = gql`
  extend type Query {
    vacanciesSources: [VacanciesSource!]
  }

  extend type Mutation {
    createVacanciesSource(
      atsId: String!
      type: VacancySourceType!
    ): VacanciesSource
    createMultipleVacanciesSources(
      options: CreateMultipleVacanciesSourcesParameters!
    ): Int!
  }

  enum VacancySourceType {
    LEVER
    GREENHOUSE
  }

  type VacanciesSource {
    id: Int!
    userId: Int!
    url: String!
    createdAt: GraphQLDateTime!
    deletedAt: GraphQLDateTime
  }

  input CreateMultipleVacanciesSourcesParameters {
    atsIds: String!
    companyNames: String!
    salaryRanges: String!
    type: VacancySourceType!
  }


`;
