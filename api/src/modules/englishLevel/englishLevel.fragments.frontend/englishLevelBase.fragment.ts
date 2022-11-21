import gql from 'graphql-tag';

export const ENGLISH_LEVEL_BASE_FRAGMENT = gql`
  fragment EnglishLevelBase on EnglishLevel {
    id
    slug
  }
`;
