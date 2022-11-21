import React, { useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import typography from '@/ui/typography/typography.module.scss';
import { Button } from '@/ui/buttons/Button';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import {
  ChangePasswordMutationVariables,
  useChangePasswordMutation,
} from '@/controllers/graphql/generated';
import AuthForm from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { Loader } from '@/ui/Loader';
import { FormField } from '@/components/FormElements/FormField';
import { InputPassword } from '@/components/FormElements/FormInputs/InputPassword';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import styles from './ChangePasswordBlock.module.scss';

type FormData = ChangePasswordMutationVariables;

export const ChangePasswordBlock = () => {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const showSuccessMessage = () => {
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  };

  const {
    errors, handleSubmit, setError, watch, control,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const { t } = useTranslation([
    Namespaces.Auth,
    Namespaces.Validations,
    Namespaces.Form,
  ]);

  const [changePasswordMutation, { loading }] = useChangePasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    const { password, repeatPassword, currentPassword } = data;

    try {
      await changePasswordMutation({
        variables: {
          password,
          repeatPassword,
          currentPassword,
        },
      });
      setIsFormOpened(false);
      showSuccessMessage();
    } catch (error) {
      const validationErrors = processValidationErrors<
        ChangePasswordMutationVariables
      >(error, setError);

      if (!validationErrors) {
        setError('currentPassword', {
          message: t(`${Namespaces.Validations}:${error.message.toLowerCase()}`),
          type: 'authentication',
        });
      }
    }
  });

  return (
    <>
      <div className="grid-container mt-40">
        <div className="grid-x grid-margin-x">
          <div className="cell large-6 large-offset-3">
            <h1 className={cn(typography.smallHeading, 'c-semidark-chocolate mb-24')}>
              {t(`${Namespaces.Auth}:change_password`)}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid-container mb-24">
        <div className="grid-x grid-margin-x">
          {!isFormOpened ? (
            <>
              <div className="cell large-offset-3 large-6 mb-40">
                <p className={cn(typography.smallText, 'c-gray mb-4')}>
                  {t(`${Namespaces.Form}:password_label`)}
                </p>
                <p className={cn(typography.smallText, 'c-gray mb-4')}>
                  * * * * * * * *
                </p>
              </div>
              <div className="cell large-3 large-offset-3">
                {isMessageVisible ? (
                  <p className={cn(typography.overhead, styles.successMessage, 'mb-16')}>
                    <IconCheck />
                    {t(`${Namespaces.Auth}:password_changed`)}
                  </p>
                ) : (
                  <Button
                    mode={Button.mode.Primary}
                    text={t(`${Namespaces.Auth}:change_password`)}
                    className="mb-16"
                    onClick={() => setIsFormOpened(true)}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="cell large-3 large-offset-3">
              <form onSubmit={onSubmit} className={AuthForm.authFormInputs}>
                <Loader active={loading} />
                <p className={cn(typography.underhead, 'mb-16')}>
                  {t(`${Namespaces.Auth}:confirm_current_password`)}
                </p>
                <FormField
                  label={{
                    for: 'currentPassword',
                    text: t(`${Namespaces.Auth}:current_password`),
                  }}
                  error={errors.currentPassword}
                  disabled={loading}
                  className="mb-32"
                  renderInput={(props) => (
                    <InputPassword
                      {...props}
                      name="currentPassword"
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

                <p className={cn(typography.underhead, 'mb-16')}>
                  {t(`${Namespaces.Auth}:create_new_password`)}
                </p>

                <FormField
                  label={{
                    for: 'password',
                    text: t(`${Namespaces.Auth}:new_password`),
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
                    text: t(`${Namespaces.Auth}:repeat_new_password`),
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
                  text={t(`${Namespaces.Profile}:save_changes`)}
                />
                <Button
                  mode={Button.mode.Secondary}
                  type="submit"
                  className="wide"
                  text={t(`${Namespaces.Profile}:discard_changes`)}
                  onClick={() => setIsFormOpened(false)}
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
