import gql from 'graphql-tag';

export const USER_AVATAR_FRAGMENT = gql`
  fragment UserAvatar on User {
    id
    avatar {
      id
      name
      mime
      url
    }
  }
`;
