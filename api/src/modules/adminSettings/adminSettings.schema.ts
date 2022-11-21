import gql from 'graphql-tag';

export const AdminSettingsSchema = gql`
  type AdminSettings {
    id: Int!
    userId: Int!
    contactsVisibilityPermission: Boolean!
    silentProfileUpdate: Boolean!
  }

  input UpdateAdminSettingsValues {
    contactsVisibilityPermission: Boolean!
    silentProfileUpdate: Boolean!
  }

  extend type Mutation {
    updateAdminSettings(
      permissions: UpdateAdminSettingsValues!
    ): AdminSettings!
  }
`;
