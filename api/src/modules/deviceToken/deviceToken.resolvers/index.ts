import { registerDeviceResolver } from '@/modules/deviceToken/deviceToken.resolvers/registerDevice.resolver';
import { unregisterDeviceResolver } from '@/modules/deviceToken/deviceToken.resolvers/unregisterDevice.resolver';

export const DeviceTokenResolvers = {
  Mutation: {
    registerDevice: registerDeviceResolver,
    unregisterDevice: unregisterDeviceResolver,
  },
};
