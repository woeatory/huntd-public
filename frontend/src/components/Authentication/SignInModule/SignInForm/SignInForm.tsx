import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { FormField } from '@/components/FormElements/FormField';
import { InputEmail } from '@/components/FormElements/FormInputs/InputEmail';
import { SignInMutationVariables } from '@/controllers/graphql/generated';
import { useSignIn } from '@/controllers/user/user.hooks/useSignIn';
import { InputPassword } from '@/components/FormElements/FormInputs/InputPassword';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import AuthForm
  from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { Routes } from '@/controllers/router/router.constants';
import { Link } from '@/controllers/i18n/i18n.client';
import typography from '@/ui/typography/typography.module.scss';
import { Loader } from '@/ui/Loader';
import { Button } from '@/ui/buttons/Button';

type FormData = SignInMutationVariables;

export const SignInForm = () => {
  const {
    errors, handleSubmit, setError, control,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const { t } = useTranslation([
    Namespaces.Auth,
    Namespaces.Validations,
    Namespaces.Form,
  ]);

  const [signInMutation, { loading }] = useSignIn();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    try {
      await signInMutation({
        variables: {
          email,
          password,
        },
      });
    } catch (error) {
      const validationErrors = processValidationErrors<
        SignInMutationVariables
      >(error, setError);

      if (!validationErrors) {
        setError('email', {
          message: t(`${Namespaces.Validations}:${error.message.toLowerCase()}`),
          type: 'authentication',
        });
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className={AuthForm.authFormInputs}>
      <Loader active={loading} />
      <FormField
        label={{
          for: 'email',
          text: t(`${Namespaces.Form}:email_label`),
        }}
        error={errors.email}
        disabled={loading}
        className="mb-24"
        renderInput={(props) => (
          <InputEmail
            {...props}
            autoComplete="email"
            name="email"
            control={control}
            autoFocus
            validation={{
              required: {
                value: true,
                message: 'required_email',
              },
            }}
          />
        )}
      />

      <FormField
        label={{
          for: 'password',
          text: t(`${Namespaces.Form}:password_label`),
        }}
        error={errors.password}
        disabled={loading}
        className="mb-40"
        renderInput={(props) => (
          <InputPassword
            {...props}
            autoComplete="current-password"
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
      <Button
        mode={Button.mode.Primary}
        disabled={loading}
        type="submit"
        className="mb-16 wide"
        text={t(`${Namespaces.Auth}:sign_in_action`)}
      />
      <Link href={Routes.ForgotPassword}>
        <a className={cn(typography.link, AuthForm.authFormLink)}>
          {t(`${Namespaces.Auth}:forgot_password_link`)}
        </a>
      </Link>
    </form>
  );
};
