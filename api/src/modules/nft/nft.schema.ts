import gql from 'graphql-tag';

export const NFTSchema = gql`
  extend type Query {
    allNfts: [Nft!]
    availableNfts: [Nft!]
  }

  extend type Mutation {
    claimNft(nftId: Int): Nft
  }

  type Nft {
    id: Int!
    openseaUrl: String!
    userId: Int
    entity: UploadedFile!
  }
`;
