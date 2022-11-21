import { offsetLimitPagination } from '@apollo/client/utilities';
import { VacanciesResult } from '@/controllers/graphql/generated';

export const VacanciesTypePolicies = {
  vacancies: {
    ...offsetLimitPagination(['options']),
    merge(
      existing = {
        rows: [],
        hasMore: false,
      },
      incoming: VacanciesResult,
    ): VacanciesResult {
      if (!incoming) {
        return existing;
      }

      const {
        rows,
      } = incoming;

      return {
        ...existing,
        ...incoming,
        rows: [...existing.rows, ...rows],
      };
    },
  },
};
