import gql from 'graphql-tag';

export const DEVICE_TOKEN_BASE_FRAGMENT = gql`
  fragment DeviceTokenBase on DeviceToken {
    id
    userId
    token
    devicePlatform
  }
`;
