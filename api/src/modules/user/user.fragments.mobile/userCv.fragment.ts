import gql from 'graphql-tag';

export const USER_CV_FRAGMENT = gql`
  fragment UserCv on User {
    id
    cv {
      id
      name
      mime
      url
    }
  }
`;
