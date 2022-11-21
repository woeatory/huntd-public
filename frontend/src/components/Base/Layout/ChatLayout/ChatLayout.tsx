import React, { FC } from 'react';
import cn from 'classnames';
import Layout from '@/components/Base/Layout/Layout.module.scss';
import { Header } from '@/components/Base/Header';
import { AlertMessage } from '@/components/Base/AlertMessage/AlertMessage';
import { HeaderAuthActions } from '@/components/Base/Header/HeaderAuthActions';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';

export const ChatLayout: FC = (props) => {
  const { children } = props;

  const { isModalOpened, openModal, closeModal } = useModalState(false);

  return (
    <>
      <Header
        renderActions={HeaderAuthActions}
        isFeedbackModalOpened={isModalOpened}
        openFeedbackModal={openModal}
        closeFeedbackModal={closeModal}
      />
      <AlertMessage />

      <div className={cn(
        Layout.pageWithoutBottomPadding,
        Layout.pageWithAlert,
      )}
      >
        {children}
      </div>
    </>
  );
};
