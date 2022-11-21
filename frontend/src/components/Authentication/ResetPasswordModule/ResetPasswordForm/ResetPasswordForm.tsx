import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { FormField } from '@/components/FormElements/FormField';
import { ResetPasswordMutationVariables } from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import AuthForm
  from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { Routes } from '@/controllers/router/router.constants';
import { Link } from '@/controllers/i18n/i18n.client';
import typography from '@/ui/typography/typography.module.scss';
import { useResetPassword } from '@/controllers/user/user.hooks/useResetPassword';
import { InputPassword } from '@/components/FormElements/FormInputs/InputPassword';
import { Loader } from '@/ui/Loader';
import { Button } from '@/ui/buttons/Button';

type FormData = ResetPasswordMutationVariables;

export const ResetPasswordForm = () => {
  const {
    errors, register, handleSubmit, setError, watch, control,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const { t } = useTranslation([
    Namespaces.Auth,
    Namespaces.Validations,
    Namespaces.Form,
  ]);

  const [resetPasswordMutation, { loading }] = useResetPassword();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const { password, repeatPassword, token } = data;

    try {
      await resetPasswordMutation({
        variables: {
          password,
          repeatPassword,
          token,
        },
      });
    } catch (error) {
      const validationErrors = processValidationErrors<
        ResetPasswordMutationVariables
      >(error, setError);

      if (!validationErrors) {
        setError('password', {
          message: t(`${Namespaces.Validations}:${error.message.toLowerCase()}`),
          type: 'authentication',
        });
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className={AuthForm.authFormInputs}>
      <Loader active={loading} />
      <input
        type="hidden"
        name="token"
        value={router.query.token}
        ref={register}
      />

      <FormField
        label={{
          for: 'password',
          text: t(`${Namespaces.Form}:password_label`),
        }}
        error={errors.password}
        disabled={loading}
        className="mb-24"
        renderInput={(props) => (
          <InputPassword
            {...props}
            autoComplete="new-password"
            name="password"
            control={control}
            validation={{
              required: {
                value: true,
                message: 'required_password',
              },
            }}
          />
        )}
      />

      <FormField
        label={{
          for: 'repeatPassword',
          text: t(`${Namespaces.Form}:repeat_password_label`),
        }}
        error={errors.repeatPassword}
        disabled={loading}
        className="mb-40"
        renderInput={(props) => (
          <InputPassword
            {...props}
            autoComplete="new-password"
            name="repeatPassword"
            control={control}
            validation={{
              required: {
                value: true,
                message: 'required_repeat_password',
              },
              validate: (value) => value === watch('password') || 'fields_not_equal',
            }}
          />
        )}
      />

      <Button
        mode={Button.mode.Primary}
        disabled={loading}
        type="submit"
        className="mb-24 wide"
        text={t(`${Namespaces.Auth}:reset_password_action`)}
      />
      <div className="text-center">
        <Link href={Routes.SignIn}>
          <a className={cn(typography.link, AuthForm.authFormLink)}>
            {t(`${Namespaces.Auth}:sign_in_link`)}
          </a>
        </Link>
      </div>
    </form>
  );
};
