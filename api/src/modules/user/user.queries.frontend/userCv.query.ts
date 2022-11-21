import gql from 'graphql-tag';
import { USER_CV_FRAGMENT } from '@/modules/user/user.fragments.frontend/userCv.fragment';

export const USER_CV_QUERY = gql`
  query UserCv {
    authUser {
      ...UserCv
    }
  }
  ${USER_CV_FRAGMENT}
`;
