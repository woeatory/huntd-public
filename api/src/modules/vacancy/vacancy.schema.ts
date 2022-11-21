import gql from 'graphql-tag';

export const VacancySchema = gql`
  extend type Query {
    vacancies(options: VacanciesParameters, offset: Int): VacanciesResult!
    vacanciesByCompany(options: VacanciesByCompanyParameters): [Vacancy!]
    hotVacancies: [Vacancy!]
    salariesDataByCategory(keywords: [String!]): VacancySalaryData!
  }

  extend type Mutation {
    sendNewVacancyRequest(
      vacancyLink: String!
      contactEmail: String!
    ): Boolean!
    sendNewVacancyApplication(
      companyName: String!
      jobTitle: String!
    ): Boolean!
    createSourcedVacancies(
      vacancies: [SourcedVacancy!]
    ): Int!
    deleteObsoleteSourcedVacancies: Int!
    addVacanciesLogo(
      companyNames: [String!]
    ): Int!

  }

  type VacanciesResult {
    rows: [Vacancy!]!
    hasMore: Boolean!
  }

  enum VacancyStatus {
    ACTIVE
    INACTIVE
  }

  enum VacancyType {
    FULL_TIME
    PART_TIME
  }

  # input AddVacanciesLogoParameters {
  #   companyNames: [String!]
  # }

  type VacancySalaryData {
    maxSalary: Int!
    averageMinSalary: Int!
    averageSalary: Int!
  }

  type VacancyData {
    vacancies: [Vacancy!]!
    salaryData: VacancySalaryData!
    hasMore: Boolean!
  }

  input VacanciesParameters {
    keywords: [String!]
  }

  input VacanciesByCompanyParameters {
    companyName: String!
  }

  input SourcedVacancy {
    sourceId: Int!
    userId: Int!
    applyLink: String!
    jobTitle: String!
    jobDescription: String!
    jobType: VacancyType!
    jobCategory: VacancyCategory!
    status: VacancyStatus!
    companyName: String!
    salaryFrom: Float
    salaryTo: Float
  }

  enum VacancyCategory {
    US_ONLY
    EUROPE_ONLY
    WORLDWIDE
  }

  type Vacancy {
    id: Int!
    status: VacancyStatus!
    companyName: String!
    jobTitle: String!
    salaryTo: Float
    salaryFrom: Float
    jobDescription: String
    jobType: VacancyType!
    jobCategory: VacancyCategory!
    englishLevel: EnglishLevel
    jobExperience: JobExperience
    technologies: [Technology!]
    specializations: [Specialization!]
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    companyLogo: UploadedFile
    isTop: Boolean!
    sourceId: Int
    userId: Int
    applyLink: String
  }
`;
