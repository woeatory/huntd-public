import gql from 'graphql-tag';

export const USERS_WITH_CHURNED_CANDIDATE_PROFILES_QUERY = gql`
  query usersWithChurnedCandidateProfiles {
    usersWithChurnedCandidateProfiles {
       id
       firstName
       email
       profilesCount
       profileId
       slug
       profileCreatedAt
    }
  }
`;
