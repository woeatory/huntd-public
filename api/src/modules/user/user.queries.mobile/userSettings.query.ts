import gql from 'graphql-tag';
import { USER_SETTINGS_FRAGMENT } from '@/modules/user/user.fragments.mobile/userSettings.fragment';

export const USER_SETTINGS = gql`
  query userSettings {
    authUser {
      id
      ...UserSettings
    }
  }
  ${USER_SETTINGS_FRAGMENT}
`;
