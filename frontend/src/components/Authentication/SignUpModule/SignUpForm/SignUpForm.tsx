import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormField } from '@/components/FormElements/FormField';
import { InputEmail } from '@/components/FormElements/FormInputs/InputEmail';
import { SignUpMutationVariables } from '@/controllers/graphql/generated';
import { InputPassword } from '@/components/FormElements/FormInputs/InputPassword';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import AuthForm
  from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { useSignUp } from '@/controllers/user/user.hooks/useSignUp';
import { Loader } from '@/ui/Loader';
import { Button } from '@/ui/buttons/Button';

type FormData = SignUpMutationVariables;

export const SignUpForm = () => {
  const {
    errors, handleSubmit, setError, watch, control,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const { query } = useRouter();

  const { t } = useTranslation([
    Namespaces.Auth,
    Namespaces.Validations,
    Namespaces.Form,
  ]);

  const [signUpMutation, { loading }] = useSignUp();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password, repeatPassword } = data;

    try {
      await signUpMutation({
        variables: {
          email,
          password,
          repeatPassword,
        },
      });
    } catch (error) {
      const validationErrors = processValidationErrors<
        SignUpMutationVariables
        >(error, setError);

      const [, translateCode] = error.message.split(': ');

      if (!validationErrors) {
        setError('email', {
          message: t(`${Namespaces.Validations}:${translateCode}`),
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
            autoFocus={!query.email}
            defaultValue={query.email as string || ''}
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
        className="mb-24"
        renderInput={(props) => (
          <InputPassword
            {...props}
            autoComplete="new-password"
            name="password"
            control={control}
            autoFocus={!!query.email}
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
        className="wide"
        text={t(`${Namespaces.Auth}:sign_up_action`)}
      />
    </form>
  );
};
