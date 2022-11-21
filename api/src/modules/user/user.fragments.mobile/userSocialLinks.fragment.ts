import gql from 'graphql-tag';

export const USER_SOCIAL_LINKS_FRAGMENT = gql`
  fragment UserSocialLinks on User {
    id
    linkedinUrl
    behanceUrl
    githubUrl
  }
`;
