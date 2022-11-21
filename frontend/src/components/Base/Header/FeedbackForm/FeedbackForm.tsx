import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { InputTextAreaUi } from '@/components/FormElements/FormInputs/InputTextArea';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { analytics } from '@/controllers/analytics/analytics.client';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Button } from '@/ui/buttons/Button';
import { useSendFeedbackMutation } from '@/controllers/graphql/generated';
import styles from './FeedbackForm.module.scss';
import { getFeedbackTitle } from './constants';

interface Options {
  closeModal: () => void
}

export const FeedbackForm: FC<Options> = ({ closeModal }) => {
  const [value, setValue] = useState('');
  const { pathname } = useRouter();
  const [mutate, { loading }] = useSendFeedbackMutation();
  const { t } = useTranslation([Namespaces.Common]);

  const sendFeedback = useCallback(async () => {
    if (!value.trim()) {
      return;
    }

    await mutate({
      variables: {
        title: getFeedbackTitle(pathname),
        body: value,
      },
    });

    setValue('');

    analytics.sendEvent(
      analytics.events.feedbacks.FeedbackSubmitted,
      {
        page: pathname,
      },
    );

    closeModal();
  }, [value, closeModal, mutate, pathname]);

  return (
    <>
      <h3 className={cn(
        typography.accentTitle,
        styles.modalTitle,
        'c-semidark-chocolate mb-16',
      )}
      >
        {t(`${Namespaces.Common}:feedback_title`)}
      </h3>

      {t(`${Namespaces.Common}:feedback_subtitle`).split('\n').map((item) => (
        <p className={cn(
          typography.text,
          typography.paragraph,
          'c-semidark-chocolate mb-16',
        )}
        >
          {item}
        </p>
      ))}
      <form
        className={styles.feedbackForm}
        onSubmit={(e) => {
          e.preventDefault();

          sendFeedback();
        }}
      >
        <InputTextAreaUi
          placeholder={t(`${Namespaces.Common}:send_feedback_placeholder`)}
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />

        <Button
          disabled={!value.trim() || loading}
          className={styles.submitButton}
          type='submit'
          mode={Button.mode.Primary}
          text={t(`${Namespaces.Common}:send_feedback_button`)}
        />
      </form>
    </>
  );
};
