import gql from 'graphql-tag';

export const USER_SETTINGS_BASE_FRAGMENT = gql`
    fragment UserSettingsBase on UserSettings {
      id
      userId
      pushNotificationsPermission
    }
`;
