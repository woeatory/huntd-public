import { useCallback } from 'react';
import { useBodyScrollLock } from '@/controllers/modal/modal.hooks/useBodyScrollLock';

interface UseModalState {
  (initialValue: boolean): {
    isModalOpened: boolean,
    openModal: () => void,
    closeModal: () => void,
  }
}

export const useModalState: UseModalState = (initialValue) => {
  const [active, setActive] = useBodyScrollLock(initialValue);

  const openModal = useCallback(
    () => setActive(true),
    [setActive],
  );

  const closeModal = useCallback(
    () => setActive(false),
    [setActive],
  );

  return { isModalOpened: active, openModal, closeModal };
};
