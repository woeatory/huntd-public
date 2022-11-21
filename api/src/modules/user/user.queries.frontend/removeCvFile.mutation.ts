import gql from 'graphql-tag';
import { USER_CV_FRAGMENT } from '@/modules/user/user.fragments.frontend/userCv.fragment';

export const REMOVE_CV_MUTATION = gql`
  mutation removeCvFile {
    removeCvFile {
      ...UserCv
    }
  }
  ${USER_CV_FRAGMENT}
`;
