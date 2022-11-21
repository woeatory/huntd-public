import gql from 'graphql-tag';

export const VACANCY_BASE_FRAGMENT = gql`
  fragment VacancyBase on Vacancy {
    id
    status
    companyName
    jobTitle
    jobDescription
    jobType
    jobCategory
    createdAt
    updatedAt
    salaryTo
    salaryFrom
    isTop
    userId
    sourceId
    applyLink
  }
`;
