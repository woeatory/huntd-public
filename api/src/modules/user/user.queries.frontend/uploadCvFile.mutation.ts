import gql from 'graphql-tag';
import { USER_CV_FRAGMENT } from '@/modules/user/user.fragments.frontend/userCv.fragment';

export const UPLOAD_CV_MUTATION = gql`
  mutation uploadCvFile($file: Upload!, $size: Int!) {
    uploadCvFile(file: $file, size: $size) {
      ...UserCv
    }
  }
  ${USER_CV_FRAGMENT}
`;
