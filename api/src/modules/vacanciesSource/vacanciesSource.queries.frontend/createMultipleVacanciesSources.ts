import gql from 'graphql-tag';

export const CREATE_MULTIPLE_VACANCIES_SOURCES_MUTATION = gql`
  mutation createMultipleVacanciesSources(
    $options: CreateMultipleVacanciesSourcesParameters!
  ) {
    createMultipleVacanciesSources(
      options: $options
    )
  }
`;
