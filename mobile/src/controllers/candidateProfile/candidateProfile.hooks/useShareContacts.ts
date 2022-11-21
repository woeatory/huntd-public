import { useCallback } from 'react';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { ProfileConnectionStatus, useReviewProfileConnectionRequestMutation } from '@/controllers/graphql/generated';

interface UseShareContacts {
  (): [(profileConnectionId: number) => Promise<void>];
}

export const useShareContacts: UseShareContacts = () => {
  const logger = useLogger({ name: 'Share contacts' });

  const [
    reviewConnection,
    { loading },
  ] = useReviewProfileConnectionRequestMutation();

  const shareContacts = useCallback(async (profileConnectionId: number) => {
    try {
      if (loading) {
        return;
      }

      await reviewConnection({
        variables: {
          id: profileConnectionId,
          status: ProfileConnectionStatus.Approved,
        },
      });
    } catch (error) {
      logger.error(error);
    }
  }, [loading, reviewConnection]);

  return [shareContacts];
};
