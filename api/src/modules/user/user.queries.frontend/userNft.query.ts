import gql from 'graphql-tag';
import { USER_NFT_FRAGMENT } from '../user.fragments.frontend/userNft.fragment';

export const USER_AVATAR_QUERY = gql`
  query UserNft {
    authUser {
      ...UserNft
    }
  }
  ${USER_NFT_FRAGMENT}
`;
