import React, { FC } from 'react';
import { useReactiveVar } from '@apollo/client';
import { confirmModalVar } from '@/controllers/confirm/confirm.cache';
import { Modal } from '@/components/Base/Modal/Modal';
import { ConfirmMessage } from '@/components/Base/ConfirmModal/ConfirmMessage';

export const ConfirmModal: FC = () => {
  const confirmModalState = useReactiveVar(confirmModalVar);

  const { onCancel, isOpen } = confirmModalState;

  return (
    <Modal isOpen={isOpen} closeModal={onCancel}>
      <ConfirmMessage {...confirmModalState} />
    </Modal>
  );
};
