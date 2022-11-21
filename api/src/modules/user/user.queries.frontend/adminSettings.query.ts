import gql from 'graphql-tag';
import { ADMIN_SETTINGS_FRAGMENT } from '@/modules/user/user.fragments.frontend/adminSettings.fragment';

export const ADMIN_SETTINGS = gql`
  query adminSettings {
    authUser {
      id
      ...AdminSettings
    }
  }
  ${ADMIN_SETTINGS_FRAGMENT}
`;
