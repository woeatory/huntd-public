import { offsetLimitPagination } from '@apollo/client/utilities';
import { PublicCandidateProfilesResult } from '@/controllers/graphql/generated';

export const PublicCandidateProfilesTypePolicies = {
  publicCandidateProfiles: {
    ...offsetLimitPagination(['where']),
    merge(
      existing = {
        rows: [],
        hasMore: false,
        count: 0,
      },
      incoming: PublicCandidateProfilesResult,
    ): PublicCandidateProfilesResult {
      if (!incoming) {
        return existing;
      }

      const {
        hasMore,
        rows,
      } = incoming;

      return {
        ...existing,
        ...incoming,
        rows: [...existing.rows, ...rows],
        hasMore,
      };
    },
  },
};
