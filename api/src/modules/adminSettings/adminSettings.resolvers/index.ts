import { updateAdminSettingsResolver } from '@/modules/adminSettings/adminSettings.resolvers/updateAdminSettings.resolver';

export const AdminSettingsResolvers = {
  Mutation: {
    updateAdminSettings: updateAdminSettingsResolver,
  },
};
