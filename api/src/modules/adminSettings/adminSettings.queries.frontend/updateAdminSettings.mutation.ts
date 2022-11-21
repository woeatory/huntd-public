import gql from 'graphql-tag';
import { ADMIN_SETTINGS_BASE_FRAGMENT } from '@/modules/adminSettings/adminSettings.fragments.frontend/adminSettingsBase.fragment';

export const UPDATE_ADMIN_SETTINGS_MUTATION = gql`
  mutation updateAdminSettings(
    $permissions: UpdateAdminSettingsValues!
  ) {
    updateAdminSettings(
      permissions: $permissions
    ) {
      ...AdminSettingsBase
    }
  }
  ${ADMIN_SETTINGS_BASE_FRAGMENT}
`;
