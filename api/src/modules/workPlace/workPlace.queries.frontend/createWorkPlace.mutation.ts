import gql from 'graphql-tag';
import { WORK_PLACE_FULL_FRAGMENT } from '@/modules/workPlace/workPlace.fragments.frontend/workPlaceFull.fragment';

export const CREATE_WORK_PLACE_MUTATION = gql`
  mutation createWorkPlace(
    $candidateProfileId: Int!
    $companyName: String!
    $companyUrl: String
    $companySizeFrom: Int
    $companySizeTo: Int
    $companyIndustry: String
    $companyCategories: String
    $companySpecialities: String
    $companyFundingType: String
    $title: String!
    $description: String
    $startDate: String!
    $endDate: String
  ) {
    createWorkPlace(
      candidateProfileId: $candidateProfileId
      companyName: $companyName,
      companyUrl: $companyUrl,
      companySizeFrom: $companySizeFrom,
      companySizeTo: $companySizeTo,
      companyIndustry: $companyIndustry,
      companyCategories: $companyCategories,
      companySpecialities: $companySpecialities,
      companyFundingType: $companyFundingType,
      title: $title
      description: $description
      startDate: $startDate
      endDate: $endDate
    ) {
      ...WorkPlaceFull

    }
  }
  ${WORK_PLACE_FULL_FRAGMENT}
`;
