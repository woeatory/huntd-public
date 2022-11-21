import React, { FC, ReactNode, useEffect } from 'react';
import cn from 'classnames';
import ReactModal from 'react-modal';
import { IconClose } from '@/ui/icons/general/IconClose';
import styles from './Modal.module.scss';

interface Props extends ReactModal.Props {
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  overlayClassName?: string;
}

export const Modal: FC<Props> = React.memo<Props>((props) => {
  const {
    children,
    isOpen,
    closeModal,
    className,
    overlayClassName,
  } = props;

  useEffect(
    () => {
      ReactModal.setAppElement('#__next');
    },
    [],
  );

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={{
        base: cn(styles.modalOverlay, overlayClassName),
        afterOpen: styles.modalOverlay_afterOpen,
        beforeClose: styles.modalOverlay_beforeClose,
      }}
      className={{
        base: cn(styles.modalContent, className),
        afterOpen: styles.modalContent_afterOpen,
        beforeClose: styles.modalContent_beforeClose,
      }}
      closeTimeoutMS={300}
      onRequestClose={closeModal}
      shouldFocusAfterRender
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      <button
        type="button"
        className={styles.closeModalButton}
        onClick={closeModal}
      >
        <IconClose />
      </button>
      {children}
    </ReactModal>
  );
});
