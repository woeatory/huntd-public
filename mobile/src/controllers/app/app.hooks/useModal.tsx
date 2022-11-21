import { useRef, Ref, useCallback } from 'react';
import { Modalize } from 'react-native-modalize';

interface UseModalHook {
  (): {
    modalRef: Ref<Modalize>,
    openModal: () => void;
    closeModal: () => void;
  }
}

export const useModal: UseModalHook = () => {
  const modalRef = useRef<Modalize>(null);

  const openModal = useCallback(() => {
    modalRef.current?.open();
  }, [modalRef]);

  const closeModal = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  return {
    openModal,
    closeModal,
    modalRef,
  };
};
