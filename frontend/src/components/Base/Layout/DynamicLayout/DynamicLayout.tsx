import React, { FC } from 'react';
import { Header } from '@/components/Base/Header';
import Layout from '@/components/Base/Layout/Layout.module.scss';
import { Footer } from '@/components/Base/Footer';
import { AlertMessage } from '@/components/Base/AlertMessage/AlertMessage';
import { HeaderAnonymousActions } from '@/components/Base/Header/HeaderAnonymousActions';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { HeaderAuthActions } from '@/components/Base/Header/HeaderAuthActions';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';

export const DynamicLayout: FC = (props) => {
  const { children } = props;
  const [user] = useAuthUser();

  const { isModalOpened, openModal, closeModal } = useModalState(false);

  return (
    <>
      <Header
        renderActions={user ? HeaderAuthActions : HeaderAnonymousActions}
        isFeedbackModalOpened={isModalOpened}
        openFeedbackModal={openModal}
        closeFeedbackModal={closeModal}
      />
      <AlertMessage isModalOpened={isModalOpened} />

      <div className={Layout.pageWithAlert}>
        {children}
      </div>

      <Footer />
    </>
  );
};
