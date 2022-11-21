import gql from 'graphql-tag';

export const UNREGISTER_DEVICE_MUTATION = gql`
  mutation unregisterDevice($token: String!) {
    unregisterDevice(token: $token)
  }
`;
