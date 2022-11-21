import gql from 'graphql-tag';

export const USER_NFT_FRAGMENT = gql`
  fragment UserNft on User {
    id
    nfts {
      id
      openseaUrl
      entity {
        id
        name
        mime
        url
      }
    }
  }
`;
