import React from 'react';
import AuthForm
  from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { SignUpForm } from '@/components/Authentication/SignUpModule/SignUpForm';
import { SignUpSocial, SignUpSocialMode } from '@/components/Authentication/SignUpModule/SignUpSocial';

export const SignUpModule = () => (
  <div className={AuthForm.authFormWrapper}>
    <SignUpForm />
    <div className={AuthForm.authFormDivider} />
    <div className={AuthForm.authFormSocial}>
      <SignUpSocial
        mode={SignUpSocialMode.Vertical}
      />
    </div>
  </div>
);
