import gql from 'graphql-tag';

export const WORK_PLACE_COMPANY_INFO_FRAGMENT = gql`
  fragment WorkPlaceCompanyInfo on CandidateProfileWorkPlace {
    companyName
    companyUrl
    companySizeFrom
    companySizeTo
    companyIndustry
    companySpecialities
    companyCategories
    companyFundingType
  }
`;
