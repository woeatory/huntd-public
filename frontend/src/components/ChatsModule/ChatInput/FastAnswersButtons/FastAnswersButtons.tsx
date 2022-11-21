import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { analytics } from '@/controllers/analytics/analytics.client';
import styles from './FastAnswersButtons.module.scss';

interface Props {
  setMessage: Dispatch<SetStateAction<string>>
  setOpenContactsModalReady: Dispatch<SetStateAction<boolean>>
}

export const FastAnswersButtons: FC<Props> = ({
  setMessage, setOpenContactsModalReady,
}) => {
  const { t } = useTranslation([Namespaces.Chat]);

  const sendAnalytics = (buttonName: string) => {
    analytics.sendEvent(
      analytics.events.pageInteraction.InterestButtonClicked,
      {
        button: buttonName,
      },
    );
  };

  return (
    <>
      <Button
        className={styles.fastAnswerButton}
        onClick={() => {
          setMessage(t(`${Namespaces.Chat}:interested_fast_answer`));
          sendAnalytics('interested');
          setOpenContactsModalReady(true);
        }}
        mode={Button.mode.Secondary}
        size={Button.size.Tiny}
        text={t(`${Namespaces.Chat}:interested_button`)}
      />

      <Button
        className={styles.fastAnswerButton}
        onClick={() => {
          setMessage(t(`${Namespaces.Chat}:not_interested_fast_answer`));
          sendAnalytics('not_interested');
          setOpenContactsModalReady(false);
        }}
        mode={Button.mode.Secondary}
        size={Button.size.Tiny}
        text={t(`${Namespaces.Chat}:not_interested_button`)}
      />
    </>
  );
};
