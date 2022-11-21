import gql from 'graphql-tag';
import { USER_SETTINGS_BASE_FRAGMENT } from '@/modules/userSettings/userSettings.fragments.mobile/userSettings.fragment';

export const UPDATE_USER_SETTINGS_MUTATION = gql`
  mutation updateUserSettings(
    $pushNotificationsPermission: Boolean
  ) {
    updateUserSettings(
      pushNotificationsPermission: $pushNotificationsPermission
    ) {
      ...UserSettingsBase
    }
  }
  ${USER_SETTINGS_BASE_FRAGMENT}
`;
