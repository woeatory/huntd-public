import gql from 'graphql-tag';

export const ADMIN_SETTINGS_BASE_FRAGMENT = gql`
    fragment AdminSettingsBase on AdminSettings {
      id
      userId
      contactsVisibilityPermission
      silentProfileUpdate
    }
`;
