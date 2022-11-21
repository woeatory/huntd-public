import { debounce } from '@/lib/debounce';
import { useUpdateConnectionLastActionTimeMutation } from '@/controllers/graphql/generated';

interface UpdateLastActionTimeOptions {
  id: number;
  time: string;
}

interface UpdateLastActionTime {
  (options: UpdateLastActionTimeOptions): void
}
let updateActionTime: UpdateLastActionTime | null = null;

export const useUpdateConnectionLastActionTime = () => {
  const [mutate] = useUpdateConnectionLastActionTimeMutation();

  if (!updateActionTime) {
    updateActionTime = debounce((options: UpdateLastActionTimeOptions) => {
      mutate({
        variables: options,
      });
    }, 500);
  }

  return updateActionTime;
};
