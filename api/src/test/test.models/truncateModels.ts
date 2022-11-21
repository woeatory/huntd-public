import { models } from '@/models';

export const truncateModels = async (): Promise<void> => {
  await Promise.all(
    Object.values(models).map((model) => model.truncate({
      cascade: true,
    })),
  );
};
