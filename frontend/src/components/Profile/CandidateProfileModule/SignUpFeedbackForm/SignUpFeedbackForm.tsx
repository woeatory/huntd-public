import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { InputTextArea } from '@/components/FormElements/FormInputs/InputTextArea';
import { Button } from '@/ui/buttons/Button';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import typography from '@/ui/typography/typography.module.scss';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useSendFeedbackMutation } from '@/controllers/graphql/generated';
import { Scale } from '@/components/Profile/CandidateProfileModule/SignUpFeedbackForm/ScaleModule/Scale';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { FormField } from '@/components/FormElements/FormField';
import { Routes, ProfileRoutes } from '@/controllers/router/router.constants';
import { Loader } from '@/ui/Loader';
import styles from './SignUpFeedbackForm.module.scss';

const SLIDER_DEFAULT_VALUE = 7;
const SLIDER_MIN_VALUE = 0;
const SLIDER_MAX_VALUE = 10;

const digits = Array.from({ length: 11 }, (_, i) => i);

interface FormData {
  description: string;
}

export const SignUpFeedbackForm: FC = () => {
  const { t } = useTranslation([Namespaces.ProfileFeedback]);
  const [score, setScore] = useState(SLIDER_DEFAULT_VALUE);
  const [mutate, { loading }] = useSendFeedbackMutation();

  const {
    errors, handleSubmit,
    setError, control,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const router = useRouter();

  const { preview } = router.query;

  const marks: Record<number, {
    style?: React.CSSProperties;
    label?: string;
  }> = Object.fromEntries(digits.map((el) => ([
    el, {
      style: {
        color: score === el ? '#f35a35' : '#474a4b',
      },
      label: String(el),
    },
  ])));

  const onSubmit = handleSubmit(async (data) => {
    if (!data.description?.trim() && score < 7) {
      setError('description', {
        type: 'required',
        message: t(`${Namespaces.Validations}:feedback_description_is_required`),
      });

      return;
    }

    await mutate({
      variables: {
        title: `[Score: ${score}] Sign Up flow feedback`,
        body: data?.description?.trim() ?? '',
      },
    });

    analytics.sendEvent(
      analytics.events.feedbacks.FeedbackSubmitted,
      {
        page: ProfileRoutes.Feedback,
        score,
      },
    );

    await router.push(`${Routes.ProfilePreview}/${preview}`);
  });

  return (
    <>
      <Loader active={loading} />
      <form
        className={cn(styles.form, 'cell large-offset-3 large-6')}
        onSubmit={onSubmit}
      >

        <h4 className={cn(typography.caption, 'c-extradark-chocolate mb-24')}>
          {t(`${Namespaces.ProfileFeedback}:scale_title`)}
        </h4>

        <Scale
          value={score}
          setValue={setScore}
          className='mb-24'
          marks={marks}
          min={SLIDER_MIN_VALUE}
          max={SLIDER_MAX_VALUE}
          defaultValue={SLIDER_DEFAULT_VALUE}
        />

        <h4 className={cn(typography.caption, 'c-extradark-chocolate mb-8')}>
          {t(`${Namespaces.ProfileFeedback}:changes_title`)}
        </h4>

        <FormField
          error={errors.description}
          disabled={loading}
          className="mb-24"
          renderInput={(renderProps) => (
            <InputTextArea
              {...renderProps}
              id='description'
              name='description'
              disabled={loading}
              control={control}
              className={cn(typography.text)}
              placeholder={t(`${Namespaces.ProfileFeedback}:changes_placeholder`)}
            />
          )}
        />

        <Button
          disabled={loading}
          type='submit'
          className={styles.sendButton}
          text={t(`${Namespaces.ProfileFeedback}:send_button`)}
          mode={Button.mode.Primary}
        />
      </form>
    </>
  );
};
