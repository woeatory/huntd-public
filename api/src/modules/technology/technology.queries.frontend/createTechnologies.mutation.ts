import gql from 'graphql-tag';
import { TECHNOLOGY_BASE_FRAGMENT } from '@/modules/technology/technology.fragments.frontend/technologyBase.fragment';

export const TECHNOLOGIES_BY_SLUGS_QUERY = gql`
  mutation createTechnologies($slugs: [String!]) {
    createTechnologies(slugs: $slugs) {
      ...TechnologyBase
    }
  }
  ${TECHNOLOGY_BASE_FRAGMENT}
`;
