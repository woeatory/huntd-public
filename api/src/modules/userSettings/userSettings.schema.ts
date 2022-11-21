import gql from 'graphql-tag';

export const UserSettingsSchema = gql`
  type UserSettings {
    id: Int!
    userId: Int!
    pushNotificationsPermission: Boolean!
  }

  extend type Mutation {
    updateUserSettings(
      pushNotificationsPermission: Boolean
    ): UserSettings!
  }
`;
