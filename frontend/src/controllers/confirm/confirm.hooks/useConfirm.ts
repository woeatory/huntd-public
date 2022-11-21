import { useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';
import { confirmModalVar } from '@/controllers/confirm/confirm.cache';

export const useConfirm = () => {
  const options = useReactiveVar(confirmModalVar);

  const confirm = useCallback(async () => {
    const promise = new Promise((resolve) => {
      confirmModalVar({
        ...confirmModalVar(),
        ...options,
        isOpen: true,
        onConfirm: () => {
          if (options.onConfirm) {
            options.onConfirm();
          }

          resolve(true);
        },
        onCancel: () => {
          if (options.onCancel) {
            options.onCancel();
          }

          resolve(false);
        },
      });
    });

    const result = await promise;

    confirmModalVar({
      ...confirmModalVar(),
      isOpen: false,
    });

    return result;
  }, [options]);

  return [confirm];
};
