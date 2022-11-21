import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { SignUpMutationVariables } from '@/controllers/graphql/generated';
import { useAuthContext } from '@/controllers/auth/auth.context';
import { FormField } from '@/components/FormElements/FormField';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { InputEmail } from '@/components/FormElements/FormInputs/InputEmail';
import { Button } from '@/components/Base/Button';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { InputPassword } from '@/components/FormElements/FormInputs/InputPassword';
import { useSignUp } from '@/controllers/auth/auth.hooks/useSignUp';

type FormData = SignUpMutationVariables;

export const SignUpForm: FC = () => {
  const { t } = useTranslation([
    Namespaces.Form,
  ]);

  const logger = useLogger({ name: 'Sign up' });

  const [signUp, { loading }] = useSignUp();
  const { setAuthState } = useAuthContext();

  const {
    control, handleSubmit, errors, setError,
  } = useForm<FormData>();

  const signUpCallback = useCallback(async (data: FormData) => {
    const { email, password, repeatPassword } = data;

    try {
      await signUp({
        variables: { email, password, repeatPassword },
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

        logger.error(error);
      }
    }
  }, [setAuthState, signUp]);

  return (
    <>
      <FormField
        label={t(`${Namespaces.Form}:email_label`)}
        name="email"
        error={errors.email}
        control={control}
        rules={{ required: true }}
        renderInput={(props) => (
          <InputEmail {...props} />
        )}
      />

      <FormField
        label={t(`${Namespaces.Form}:password_label`)}
        name="password"
        error={errors.password}
        control={control}
        rules={{ required: true }}
        renderInput={(props) => (
          <InputPassword {...props} />
        )}
      />

      <FormField
        label={t(`${Namespaces.Form}:repeat_password_label`)}
        name="repeatPassword"
        error={errors.repeatPassword}
        control={control}
        rules={{ required: true }}
        renderInput={(props) => (
          <InputPassword {...props} />
        )}
      />

      <Button
        disabled={loading}
        onPress={handleSubmit(signUpCallback)}
        title={t(`${Namespaces.Auth}:sign_up_action`)}
      />
    </>
  );
};
