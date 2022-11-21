import React, { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { Button } from '@/ui/buttons/Button';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { IconWarning } from '@/ui/icons/general/IconWarning';
import styles from './WorkPlacesBlock.module.scss';

interface Props {
  closeModal: () => void;
  setFromLinkedInBlockActive: Dispatch<SetStateAction<boolean>>;

}
export const WorkPlacesModal: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Chat]);

  const {
    closeModal, setFromLinkedInBlockActive,
  } = props;

  return (
    <div className={styles.messageWrapper}>
      <h3 className={cn('mb-32 mr-40', typography.accentTitle)}>
        {t(`${Namespaces.Profile}:from_linkedin_title`)}
      </h3>
      <div className={styles.bodyContainer}>
        <IconWarning />
        <p className={cn('ml-8 mb-32 c-gray', typography.smallText, styles.confirmMessage)}>
          {t(`${Namespaces.Profile}:linkedin_warning`)}
        </p>
      </div>

      <div className={styles.modalWrapper}>
        <Button
          mode={Button.mode.Primary}
          className={styles.modalButton}
          text={t(`${Namespaces.Profile}:agree_label`)}
          onClick={() => {
            setFromLinkedInBlockActive(true);
            closeModal();
          }}
        />
        <Button
          mode={Button.mode.Secondary}
          className={styles.modalButton}
          text={t(`${Namespaces.Profile}:cancel_label`)}
          onClick={closeModal}
        />
      </div>
    </div>
  );
};
