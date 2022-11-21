import gql from 'graphql-tag';
import { USER_AVATAR_FRAGMENT } from '@/modules/user/user.fragments.frontend/userAvatar.fragment';

export const UPLOAD_AVATAR_MUTATION = gql`
  mutation uploadAvatar(
    $file: Upload!
    $size: Int!
  ) {
    uploadAvatar(file: $file, size: $size) {
      ...UserAvatar
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;
