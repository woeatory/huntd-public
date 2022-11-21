import { updateUserSettingsResolver } from '@/modules/userSettings/userSettings.resolvers/updateUserSettings.resolver';

export const UserSettingsResolvers = {
  Mutation: {
    updateUserSettings: updateUserSettingsResolver,
  },
};
