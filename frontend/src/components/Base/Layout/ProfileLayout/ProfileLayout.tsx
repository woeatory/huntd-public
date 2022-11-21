import React, { FC } from 'react';
import cn from 'classnames';
import { Header } from '@/components/Base/Header';
import { AlertMessage } from '@/components/Base/AlertMessage/AlertMessage';
import Layout from '@/components/Base/Layout/Layout.module.scss';
import { Footer } from '@/components/Base/Footer';
import { HeaderAuthActions } from '@/components/Base/Header/HeaderAuthActions';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';

export const ProfileLayout: FC = (props) => {
  const { children } = props;

  const [user] = useAuthUser();

  const isFirstTimeFillingProfile = (
    user?.isFirstTimeFillingCandidateProfile ?? false
  );

  const { isModalOpened, openModal, closeModal } = useModalState(false);

  return (
    <>
      <Header
        renderActions={HeaderAuthActions}
        isFeedbackModalOpened={isModalOpened}
        openFeedbackModal={openModal}
        closeFeedbackModal={closeModal}
      />
      {!isFirstTimeFillingProfile && (
        <AlertMessage isModalOpened={isModalOpened} />
      )}

      <div className={cn(
        Layout.page,
        { [Layout.pageWithAlert]: !isFirstTimeFillingProfile },
        Layout.pageWithBg,
      )}
      >
        {children}
      </div>

      <Footer />
    </>
  );
};
