import React, { FC } from 'react';
import { Header } from '@/components/Base/Header';
import Layout from '@/components/Base/Layout/Layout.module.scss';
import { Footer } from '@/components/Base/Footer';
import { HeaderAnonymousActions } from '@/components/Base/Header/HeaderAnonymousActions';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { HeaderAuthActions } from '@/components/Base/Header/HeaderAuthActions';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';

export const BottomlessLayout: FC = (props) => {
  const { children } = props;
  const [user] = useAuthUser();

  const { isModalOpened, openModal, closeModal } = useModalState(false);

  return (
    <>
      <Header
        isFeedbackModalOpened={isModalOpened}
        openFeedbackModal={openModal}
        closeFeedbackModal={closeModal}
        renderActions={user ? HeaderAuthActions : HeaderAnonymousActions}
      />

      <div className={Layout.pageWithoutBottomPadding}>
        {children}
      </div>

      <Footer />
    </>
  );
};
