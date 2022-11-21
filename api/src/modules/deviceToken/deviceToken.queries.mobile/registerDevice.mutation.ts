import gql from 'graphql-tag';
import { DEVICE_TOKEN_BASE_FRAGMENT } from '@/modules/deviceToken/deviceToken.fragments.mobile/deviceTokenBase.fragment';
import { DEVICE_TOKEN_EXTRA_FRAGMENT } from '@/modules/deviceToken/deviceToken.fragments.mobile/deviceTokenExtra.fragment';

export const REGISTER_DEVICE_MUTATION = gql`
  mutation registerDevice(
    $token: String!,
    $devicePlatform: DevicePlatform!,
    $deviceYear: String,
    $systemVersion: String,
    $deviceName: String,
  ) {
    registerDevice(
      token: $token,
      devicePlatform: $devicePlatform,
      deviceYear: $deviceYear,
      systemVersion: $systemVersion,
      deviceName: $deviceName,
    ) {
      ...DeviceTokenBase
      ...DeviceTokenExtra
    }
  }

  ${DEVICE_TOKEN_BASE_FRAGMENT}
  ${DEVICE_TOKEN_EXTRA_FRAGMENT}
`;
