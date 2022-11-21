import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import cookie from 'cookie';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Routes } from '@/controllers/router/router.constants';
import { IconLogo } from '@/ui/icons/custom/IconLogo';
import { IconArrowLeft } from '@/ui/icons/general/IconArrowLeft';
import { PrimeNum } from '@/controllers/join/join.hocs/withCode';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import typography from '@/ui/typography/typography.module.scss';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { FormField } from '@/components/FormElements/FormField';
import { analytics } from '@/controllers/analytics/analytics.client';
import styles from './Invite.module.scss';

interface Props {
  code: string;
}

type FormData = Props;

export const InviteModule: FC<Props> = () => {
  const { t } = useTranslation([Namespaces.Join]);
  const router = useRouter();

  const {
    control, register,
    handleSubmit, setError,
    errors,
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  useEffect(() => {
    analytics.setUserProperties({
      joinedWithCode: true,
      code: router.query.join_code ?? 'no_code',
    });

    analytics.sendEvent(
      analytics.events.auth.JoinPageVisited,
      {},
    );
  }, [router]);

  const proceedJoin = handleSubmit(async (data) => {
    const cookieObject = cookie.parse(document.cookie);
    const { code } = data;

    if (!code.trim() || +code === 0) {
      setError('code', {
        message: t(`${Namespaces.Validations}:wrong_join_code`),
        type: 'authentication',
      });

      return;
    }

    const { join_code: joinCode } = cookieObject;

    if (
      ((joinCode === code) || (+code.trim() % +PrimeNum.base === 0))
      && document.cookie
    ) {
      document.cookie = `join_code=${code}; Max-Age=0; `;

      analytics.sendEvent(
        analytics.events.auth.JoinCodeSubmitted,
        {
          code,
        },
      );

      await router.push(Routes.SignUp);
    } else {
      setError('code', {
        message: t(`${Namespaces.Validations}:wrong_join_code`),
        type: 'authentication',
      });
    }
  });

  return (
    <div className={cn('grid-container', styles.wrapper)}>
      <div className='grid-x grid-margin-x'>
        <div className='cell large-offset-2 large-2 mb-32'>
          <IconLogo />
        </div>
        <div className='cell large-offset-2 large-7 mb-64'>
          <h1 className={cn(styles.title, 'c-extradark-chocolate')}>
            {t(`${Namespaces.Join}:join_page_title_platform`)}
            <strong className='c-citrus'>
              {`\n${t(`${Namespaces.Join}:join_page_title_engineers`)}`}
            </strong>
            {`\n${t(`${Namespaces.Join}:join_page_title_to_receive`)}`}
            <strong className='c-citrus'>{`\n${t(`${Namespaces.Join}:join_page_title_offers`)}`}</strong>
          </h1>
        </div>

        <form
          className={cn(styles.formContainer, 'cell large-7 large-offset-2 grid-x grid-margin-x')}
          onSubmit={proceedJoin}
        >
          <label
            htmlFor="code"
            className={cn(
              'cell large-6 large-offset-3 medium-8 medium-offset-2 mb-24',
              typography.underhead,
            )}
          >
            {t(`${Namespaces.Join}:join_code_label`)}
          </label>

          <FormField
            error={errors.code}
            disabled={false}
            className='cell large-6 large-offset-3 medium-8 medium-offset-2 mb-24'
            renderInput={(props) => (
              <InputText
                {...props}
                type='password'
                id='code'
                name='code'
                ref={register}
                control={control}
                validation={{
                  required: {
                    value: true,
                    message: 'code_is_required',
                  },
                }}
                placeholder={t(`${Namespaces.Join}:join_code_placeholder`)}
              />
            )}
          />

          <Button
            mode={Button.mode.Primary}
            text={t(`${Namespaces.Join}:join_button`)}
            type='submit'
            className={cn(
              'cell large-6 large-offset-3 medium-8 medium-offset-2',
              styles.button,
            )}
            RightIcon={IconArrowLeft}
          />
        </form>
      </div>
    </div>
  );
};
