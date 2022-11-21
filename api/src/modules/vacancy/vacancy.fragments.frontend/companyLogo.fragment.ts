import gql from 'graphql-tag';

export const COMPANY_LOGO_FRAGMENT = gql`
  fragment CompanyLogo on Vacancy {
    id
    companyLogo {
      id
      name
      mime
      url
    }
  }
`;
