import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { FormField } from '@/components/FormElements/FormField';
import { InputEmail } from '@/components/FormElements/FormInputs/InputEmail';
import {
  ForgotPasswordMutationVariables,
  useForgotPasswordMutation,
} from '@/controllers/graphql/generated';
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

type FormData = ForgotPasswordMutationVariables;

interface Props {
  onSuccess?: () => any
}
export const ForgotPasswordForm: FC<Props> = ({
  onSuccess = () => undefined,
}) => {
  const {
    errors, control, handleSubmit, setError,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const { t } = useTranslation([
    Namespaces.Auth,
    Namespaces.Validations,
    Namespaces.Form,
  ]);

  const [forgotPasswordMutation, { loading }] = useForgotPasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    const { email } = data;

    try {
      await forgotPasswordMutation({
        variables: {
          email,
        },
      });
      onSuccess();
    } catch (error) {
      const validationErrors = processValidationErrors<
        ForgotPasswordMutationVariables
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
        className="mb-40"
        renderInput={(props) => (
          <InputEmail
            {...props}
            autoComplete="email"
            name="email"
            control={control}
            validation={{
              required: {
                value: true,
                message: 'required_email',
              },
            }}
          />
        )}
      />

      <Button
        mode={Button.mode.Primary}
        disabled={loading}
        type="submit"
        text={t(`${Namespaces.Auth}:forgot_password_action`)}
        className="wide mb-24"
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
