import gql from 'graphql-tag';

export const JOB_EXPERIENCE_BASE_FRAGMENT = gql`
  fragment JobExperienceBase on JobExperience {
    id
    slug
  }
`;
