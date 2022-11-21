import gql from 'graphql-tag';

export const DEACTIVATE_UNRESPONSIVE_PROFILES_MUTATION = gql`
  mutation deactivateUnresponsiveProfiles($userIds: [Int!]) {
    deactivateUnresponsiveProfiles(userIds: $userIds)
  }
`;
