import gql from 'graphql-tag';
import { TECHNOLOGY_BASE_FRAGMENT } from '@/modules/technology/technology.fragments.mobile/technologyBase.fragment';

export const CREATE_TECHNOLOGY_MUTATION = gql`
  mutation createTechnology($name: String!) {
    createTechnology(name: $name) {
      ...TechnologyBase
    }
  }
  ${TECHNOLOGY_BASE_FRAGMENT}
`;
