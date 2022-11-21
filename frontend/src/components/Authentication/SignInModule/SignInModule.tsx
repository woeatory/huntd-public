import React from 'react';
import AuthForm from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { SignInForm } from '@/components/Authentication/SignInModule/SignInForm';
import { SignInSocial } from '@/components/Authentication/SignInModule/SignInSocial';

export const SignInModule = () => (
  <div className={AuthForm.authFormWrapper}>
    <SignInForm />
    <div className={AuthForm.authFormDivider} />
    <div className={AuthForm.authFormSocial}>
      <SignInSocial />
    </div>
  </div>
);
