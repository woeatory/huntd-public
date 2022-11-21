import gql from 'graphql-tag';
import { WORK_PLACE_BASE_FRAGMENT } from './workPlaceBase.fragment';
import { WORK_PLACE_COMPANY_INFO_FRAGMENT } from './workPlaceCompanyInfo.fragment';

export const WORK_PLACE_FULL_FRAGMENT = gql`
  fragment WorkPlaceFull on CandidateProfileWorkPlace {
    ...WorkPlaceBase
    ...WorkPlaceCompanyInfo
  }
  ${WORK_PLACE_COMPANY_INFO_FRAGMENT}
  ${WORK_PLACE_BASE_FRAGMENT}
`;
