import React from 'react';
import cn from 'classnames';
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
import { Loader } from '@/ui/Loader';
import { Button } from '@/ui/buttons/Button';
import { IconArrowLeft } from '@/ui/icons/general/IconArrowLeft';
import { useSignUpAsPresubscribedUser } from '@/controllers/user/user.hooks/useSignUpAsPresubscribedUser';

type FormData = SignUpMutationVariables;

export const SignUpPresubscribedForm = () => {
  const {
    errors, handleSubmit, setError, control, watch, formState,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const { t } = useTranslation([
    Namespaces.Auth,
    Namespaces.Validations,
    Namespaces.Form,
  ]);

  const { query } = useRouter();

  const [signUpMutation, { loading }] = useSignUpAsPresubscribedUser();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password, repeatPassword } = data;

    try {
      await signUpMutation({
        variables: {
          username: query.companyId as string,
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
      <div className={AuthForm.presubscribedFormContainer}>
        <Loader active={loading} />
        <FormField
          error={errors.email}
          disabled={loading}
          className={cn(AuthForm.emailInput, 'mb-24')}
          renderInput={(props) => (
            <InputEmail
              {...props}
              autoComplete="email"
              name="email"
              control={control}
              placeholder={t(`${Namespaces.Form}:email_label`)}
              validation={{
                required: {
                  value: true,
                  message: 'required_email',
                },
              }}
            />
          )}
        />

        <div className={cn(
          AuthForm.passwordContainer, {
            [AuthForm.overlay]: formState.isDirty,
          },
        )}
        >
          <FormField
            error={errors.password}
            disabled={loading}
            className="mb-24"
            renderInput={(props) => (
              <InputPassword
                {...props}
                autoComplete="new-password"
                name="password"
                control={control}
                placeholder={t(`${Namespaces.Form}:password_label`)}
                withoutVisibilityToggler
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
            error={errors.repeatPassword}
            disabled={loading}
            className="mb-32"
            renderInput={(props) => (
              <InputPassword
                {...props}
                autoComplete="new-password"
                name="repeatPassword"
                control={control}
                placeholder={t(`${Namespaces.Form}:repeat_password_label`)}
                withoutVisibilityToggler
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
        </div>

        <Button
          mode={Button.mode.Primary}
          disabled={loading}
          type="submit"
          className={cn(AuthForm.presubscribedButton, 'wide')}
          text={t(`${Namespaces.Form}:engineers_sign_up_button`)}
          RightIcon={IconArrowLeft}
        />
      </div>

    </form>
  );
};
