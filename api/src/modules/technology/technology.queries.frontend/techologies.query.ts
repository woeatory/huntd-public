import gql from 'graphql-tag';
import { TECHNOLOGY_BASE_FRAGMENT } from '@/modules/technology/technology.fragments.frontend/technologyBase.fragment';

export const TECHNOLOGIES_QUERY = gql`
  query technologies($query: String, $requiredTechnologiesIds: [Int!]) {
    technologies(query: $query, requiredTechnologiesIds: $requiredTechnologiesIds) {
      ...TechnologyBase
    }
  }
  ${TECHNOLOGY_BASE_FRAGMENT}
`;
