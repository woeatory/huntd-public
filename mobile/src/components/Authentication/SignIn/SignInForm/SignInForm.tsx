import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormField } from '@/components/FormElements/FormField';
import { InputEmail } from '@/components/FormElements/FormInputs/InputEmail';
import { InputPassword } from '@/components/FormElements/FormInputs/InputPassword';
import { Button } from '@/components/Base/Button';
import { AuthUserDocument, SignInMutationVariables, useSignInMutation } from '@/controllers/graphql/generated';
import { useAuthContext } from '@/controllers/auth/auth.context';
import { AuthStatus } from '@/controllers/auth/auth.typedefs';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';

interface SignInFormData {
  email: string;
  password: string;
}

export const SignInForm: FC = () => {
  const { t } = useTranslation([
    Namespaces.Auth,
    Namespaces.Form,
    Namespaces.Validations,
  ]);

  const logger = useLogger({ name: 'Sign in' });

  const [signIn, { loading }] = useSignInMutation();
  const { setAuthState } = useAuthContext();

  const {
    control, handleSubmit, errors, setError,
  } = useForm<SignInFormData>();

  const onSubmit = useCallback(async (data: SignInFormData) => {
    const { email, password } = data;

    try {
      const response = await signIn({
        variables: { email, password },
        refetchQueries: [{ query: AuthUserDocument }],
        awaitRefetchQueries: true,
      });

      if (response.data) {
        await AnalyticsClient.identify(
          response.data.signIn.email,
          response.data.signIn,
        );
        await AnalyticsClient.logEvent(AnalyticsEvents.auth.SignIn);

        setAuthState({
          authStatus: AuthStatus.LoggedIn,
        });

        logger.info(`User signed in: ${response.data.signIn.id}`);
      }
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
  }, [logger, setAuthState, setError, signIn, t]);

  return (
    <>
      <FormField
        label={t(`${Namespaces.Form}:email_label`)}
        name="email"
        error={errors.email}
        control={control}
        renderInput={(props) => (
          <InputEmail {...props} />
        )}
      />

      <FormField
        label={t(`${Namespaces.Form}:password_label`)}
        name="password"
        error={errors.password}
        control={control}
        renderInput={(props) => (
          <InputPassword {...props} />
        )}
      />

      <Button
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
        title={t(`${Namespaces.Auth}:sign_in_action`)}
      />
    </>
  );
};
