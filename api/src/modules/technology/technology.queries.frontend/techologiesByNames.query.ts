import gql from 'graphql-tag';
import { TECHNOLOGY_BASE_FRAGMENT } from '@/modules/technology/technology.fragments.frontend/technologyBase.fragment';

export const TECHNOLOGIES_BY_NAMES_QUERY = gql`
  query technologiesByNames($names: [String!]!) {
    technologiesByNames(names: $names) {
      ...TechnologyBase
    }
  }
  ${TECHNOLOGY_BASE_FRAGMENT}
`;
