import gql from 'graphql-tag';

export const NFT_BASE_FRAGMENT = gql`
  fragment NftBase on Nft {
    id
    userId
    openseaUrl
    entity {
      id
      url
      name
      mime
    }
  }
`;
