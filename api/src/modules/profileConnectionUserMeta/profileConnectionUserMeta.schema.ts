import gql from 'graphql-tag';

export const ProfileConnectionUserMetaSchema = gql`
  type ProfileConnectionUserMeta {
    id: Int!
    lastActionTime: GraphQLDateTime
    archivedAt: GraphQLDateTime
  }
`;
