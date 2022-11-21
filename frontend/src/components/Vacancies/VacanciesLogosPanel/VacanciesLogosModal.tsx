import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/ui/buttons/Button';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { VacanciesLogosPanelActions } from './VacanciesLogosForm';

const Modal = dynamic(
  async () => {
    const mod = await import('@/components/Base/Modal/Modal');

    return mod.Modal;
  },
  {
    ssr: false,
  },
);

export const VacanciesLogosPanel = () => {
  const { openModal, closeModal, isModalOpened } = useModalState(false);

  const { t } = useTranslation(Namespaces.Vacancy);

  return (
    <div>
      <Button
        mode={Button.mode.Primary}
        size={Button.size.SmallWide}
        onClick={openModal}
        text={t(`${Namespaces.Vacancy}:update_logos`)}
        type="button"
      />
      <Modal
        isOpen={isModalOpened}
        closeModal={closeModal}
      >
        <VacanciesLogosPanelActions closeModal={closeModal} />
      </Modal>
    </div>
  );
};
