import gql from 'graphql-tag';
import { USER_SETTINGS_BASE_FRAGMENT } from '@/modules/userSettings/userSettings.fragments.mobile/userSettings.fragment';

export const USER_SETTINGS_FRAGMENT = gql`
  fragment UserSettings on User {
    settings {
      ...UserSettingsBase
    }
  }
  ${USER_SETTINGS_BASE_FRAGMENT}
`;
