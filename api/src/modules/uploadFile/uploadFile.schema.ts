import gql from 'graphql-tag';

export const UploadFileSchema = gql`
  type UploadedFile {
    id: Int!
    name: String!
    mime: String!
    url: String!
  }
`;
