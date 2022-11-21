import gql from 'graphql-tag';
import { ADMIN_SETTINGS_BASE_FRAGMENT } from '@/modules/adminSettings/adminSettings.fragments.frontend/adminSettingsBase.fragment';

export const ADMIN_SETTINGS_FRAGMENT = gql`
  fragment AdminSettings on User {
    adminSettings {
      ...AdminSettingsBase
    }
  }
  ${ADMIN_SETTINGS_BASE_FRAGMENT}
`;
