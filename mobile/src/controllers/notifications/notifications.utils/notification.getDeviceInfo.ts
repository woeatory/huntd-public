import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { DevicePlatform } from '@/controllers/graphql/generated';

export type GetDeviceInfoHookResult = {
  deviceYear?: string;
  systemVersion: string;
  devicePlatform: DevicePlatform;
  deviceName?: string;
}

export function getDeviceInfo(): GetDeviceInfoHookResult {
  const platform = Platform.OS.toUpperCase() === DevicePlatform.Ios
    ? DevicePlatform.Ios
    : DevicePlatform.Android;

  return {
    deviceYear: Constants.deviceYearClass?.toString(),
    systemVersion: Platform.Version.toString(),
    devicePlatform: platform,
    deviceName: Constants.deviceName,
  };
}
