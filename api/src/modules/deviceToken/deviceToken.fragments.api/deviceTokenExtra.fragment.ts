import gql from 'graphql-tag';

export const DEVICE_TOKEN_EXTRA_FRAGMENT = gql`
  fragment DeviceTokenExtra on DeviceToken {
    deviceName
    deviceYear
    systemVersion
  }
`;
