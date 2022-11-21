import gql from 'graphql-tag';

export const DeviceTokenSchema = gql`
  enum DevicePlatform {
    IOS
    ANDROID
  }

  extend type Mutation {
    registerDevice(
      token: String!
      devicePlatform: DevicePlatform!
      deviceYear: String
      systemVersion: String
      deviceName: String
    ): DeviceToken
    unregisterDevice(
      token: String!
    ): Boolean
  }

  type DeviceToken {
    id: Int!
    userId: Int!
    token: String!
    devicePlatform: DevicePlatform!
    deviceYear: String
    systemVersion: String
    deviceName: String
  }
`;
