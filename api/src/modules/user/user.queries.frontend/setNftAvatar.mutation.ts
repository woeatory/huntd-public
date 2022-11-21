import gql from 'graphql-tag';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.frontend/userAvatar.fragment';

export const SET_NFT_AVATAR_MUTATION = gql`
  mutation setNftAvatar(
    $nftId: Int
  ) {
    setNftAvatar(
      nftId: $nftId
    ) {
    ...UserAvatar
  }
 }
  ${USER_AVATAR_FRAGMENT}
`;
