import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useConfirmEmailMutation } from '@/controllers/graphql/generated';
import AuthForm from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import FormField from '@/components/FormElements/FormField/FormField.module.scss';
import { Loader } from '@/ui/Loader';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { ConfirmEmailSuccessMessage } from '@/components/Authentication/ConfirmEmailModule/ConfirmEmailSuccessMessage';
import typography from '@/ui/typography/typography.module.scss';

export const ConfirmEmailModule = () => {
  const { t } = useTranslation([Namespaces.Auth]);
  const [isConfirmed, setConfirmed] = useState(false);
  const [confirmEmailMutation, { loading, called }] = useConfirmEmailMutation();

  const router = useRouter();

  useEffect(
    () => {
      const confirmEmail = async () => {
        try {
          await confirmEmailMutation({
            variables: {
              token: router.query.token as string,
            },
          });

          setConfirmed(true);
        } catch (error) {
          setConfirmed(false);
        }
      };

      confirmEmail();
    },
    [confirmEmailMutation, router],
  );

  if (loading || !called) {
    return <Loader active={loading} />;
  }

  return (
    <div className={AuthForm.authFormSimple}>
      <h1 className={cn(FormField.label, 'mb-4')}>
        {t(`${Namespaces.Auth}:confirm_email_page_title`)}
      </h1>
      {isConfirmed
        ? (
          <ConfirmEmailSuccessMessage />
        )
        : (
          <p className={cn(typography.alertText, 'c-semidark-chocolate mb-8')}>
            {t(`${Namespaces.Auth}:confirm_email_error_message`)}
          </p>
        )}
    </div>
  );
};
