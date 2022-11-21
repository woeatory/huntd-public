import gql from 'graphql-tag';

export const SALARIES_DATA_BY_CATEGORY_QUERY = gql`
  query salariesDataByCategory($keywords: [String!]) {
    salariesDataByCategory(keywords: $keywords) {
      maxSalary
      averageMinSalary
      averageSalary
    }
  }
`;
